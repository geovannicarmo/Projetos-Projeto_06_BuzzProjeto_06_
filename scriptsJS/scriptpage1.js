function criarQuizz() {
    document.querySelector('.home').classList.add('escondido')
    document.querySelector('.infBasic').classList.remove('escondido')
    comeco()
}

function carregarTodosQuizzes() {
    
    Loading.classList.remove("escondido")
    document.querySelector('.todos-quizzes > div').innerHTML = ''
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes')

    promise.then(response => {
        console.log(response.data)
        Loading.classList.add("escondido")
        for(let i = 0; i < response.data.length; i++) {
            document.querySelector('.todos-quizzes > div').innerHTML += `
                <div class="card-quizz" style="${background(response.data[i].image, opacidadeLinearBottom, true)}"
                    onclick="obterQuizz(${response.data[i].id})">
                    <h3>${response.data[i].title}</h3>
                </div>
            `
        }
    })
}

function carregarQuizzesUsuario() {
    document.querySelector('.com-quizzes .seus-quizzes').innerHTML = ''
    getLocal = JSON.parse(localStorage.getItem('localIdsSecretKeys'))
    console.log(getLocal)
    
    if(localStorage.getItem('localIdsSecretKeys') !== null) {
        document.querySelector('.sem-quizzes').classList.add('escondido')
        document.querySelector('.com-quizzes').classList.remove('escondido')

        for(let i = 0; i < getLocal.length; i++) {
            let promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${getLocal[i].id}`)
            promise.then(response => {
                document.querySelector('.com-quizzes .seus-quizzes').innerHTML += `
                    <div>
                        <div class="card-quizz" style="${background(response.data.image, opacidadeLinearBottom, true)}"
                            onclick="obterQuizz(${response.data.id})">
                            <h3>${response.data.title}</h3>
                        </div>
                        <div class="gerenciar-quizz">   
                            <ion-icon name="create-outline" onclick="editarQuizz('${getLocal[i].id}', '${getLocal[i].SecretKey}')"></ion-icon>
                            <ion-icon name="trash-outline" onclick="removerQuizz('${getLocal[i].id}', '${getLocal[i].SecretKey}')"></ion-icon>
                        </div>
                    </div>
                `
            })
        }
    }   
}

function removerQuizz(id, secretKey) {
    if(confirm("Deseja deletar esse Quizz?") === true) {
        getLocal = JSON.parse(localStorage.getItem('localIdsSecretKeys'))
        for(let i = 0; i < getLocal.length; i++) {
            if(`${getLocal[i].id}` === id) {
                console.log('IGUAIS!')
                getLocal.splice(i, 1)
            }
        }

        if(getLocal.length === 0) {
            localStorage.removeItem('localIdsSecretKeys')
            document.querySelector('.com-quizzes').classList.add('escondido')
            document.querySelector('.sem-quizzes').classList.remove('escondido')
        } else {
            localStorage.setItem('localIdsSecretKeys', JSON.stringify(getLocal))
        }

        axios.delete(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${id}`, { headers: { "Secret-Key": secretKey } })
        voltarHome()
    }
}

function editarQuizz(id, secretKey) {
    document.querySelector('.home').classList.add('escondido')
    document.querySelector(".infBasic").classList.remove('escondido')
    const promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${id}`)

    promise.then(response => {
        quizzSelecionado = { data: response.data, secretKey }
        console.log(quizzSelecionado)
        comeco()
    })
}



carregarTodosQuizzes()
carregarQuizzesUsuario()
