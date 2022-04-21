function infQuizz() {
    let titulo = document.querySelector("#titulo")

    let url = document.querySelector("#url")

    let nperguntas = document.querySelector("#nperguntas")

    let nniveis = document.querySelector("#nniveis")


    console.log(titulo.value.length)

    if (titulo.value.length < 20 || titulo.value.length > 65 || nperguntas.value < 3 || isNaN(nperguntas.value) || nniveis.value < 2 || isNaN(nniveis.value)) {
        alert("Preencha os dados corretamente.")
    }
    else {

        let infBasic = document.querySelector(".infBasic")
        infBasic.classList.add("escondido")
    }
}

function comeco() {
    element = document.querySelector(".infBasic")


    pagina1 = `

<h2>Comece pelo começo</h2>

<div class="infQuizz">

    <input type="text" id="titulo" name="firstname" placeholder="    Título do seu quizz">
    <input type="text" id="url" name="firstname" placeholder="    URL da imagem do seu quizz
    ">
    <input type="text" id="nperguntas" name="firstname" placeholder="    Quantidade de perguntas do quizz
    ">
    <input type="text" id="nniveis" name="firstname" placeholder="    Quantidade de níveis do quizz
    ">

</div>

<div onclick="infQuizz()" class="buttonInf">

    <p>Prosseguir pra criar perguntas</p>

</div>`

    element.innerHTML = pagina1


}
comeco()


// -------------------- Tela 2 - Jogando Quizz ------------------------
let questoesSortidas = []
let levels = []
const opacidadeLinear = 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),'
const background = (response) => `
    background: ${opacidadeLinear} url(${response.data.image}); 
    background-repeat: no-repeat;
    background-size: 100%;
    object-fit: cover;
`

function embaralhar() {
    return Math.random() - 0.5;
}

function obterQuizz() {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${8098}`)

    promise.then(response => {
        levels = response.data.levels
        document.querySelector('.container-jogando').innerHTML = `
            <div class="quizz-principal" style="${background(response)}">
                <h1>${response.data.title}</h1>
            </div>
            <div class="perguntas-quizz">
            </div>
        `
        const questions = response.data.questions

        for (let i = 0; i < questions.length; i++) {
            document.querySelector('.perguntas-quizz').innerHTML += `
                <div class="container-perguntas">
                    <div class="titulo-pergunta" style="background-color: ${questions[i].color};">
                        <h3>${questions[i].title}</h3>
                    </div>
                    <div class="container-respostas">      
                    </div>
                </div>
            `
            questoesSortidas = questions[i].answers
            questoesSortidas = questoesSortidas.sort(embaralhar)

            for (let j = 0; j < questions[i].answers.length; j++) {
                document.querySelectorAll('.container-respostas')[i].innerHTML += `
                    <div class="card-resposta card${i} ${questoesSortidas[j].isCorrectAnswer.toString()}" 
                        onclick="selecionarResposta(this, 'card${i}')">
                        <img src="${questoesSortidas[j].image}" alt="">
                        <p>${questoesSortidas[j].text}</p>
                    </div>
                `
            }
        }
    })
}
obterQuizz()
let count = 0;
let countAcertos = 0;

function selecionarResposta(resposta, id) {
    if(resposta.classList.contains('true')) countAcertos++

    for(let i = 0; i < document.querySelectorAll(`.card-resposta.${id}`).length; i++) {
        if(document.querySelectorAll(`.card-resposta.${id}`)[i] !== resposta) {
            document.querySelectorAll(`.card-resposta.${id}`)[i].classList.add('opacity')
        }

        if(document.querySelectorAll(`.card-resposta.${id}`)[i].classList.contains('true')) {
            document.querySelectorAll(`.card-resposta.${id}`)[i].querySelector('p').style.color = '#009C22'
        } else {
            document.querySelectorAll(`.card-resposta.${id}`)[i].querySelector('p').style.color = '#FF0B0B'
        }
    }

    if(document.querySelectorAll('.container-perguntas')[count].nextElementSibling !== null) {
        setTimeout(() => {
            document.querySelectorAll('.container-perguntas')[count].nextElementSibling.scrollIntoView({ behavior: 'smooth', block: 'center' });
            count += 1;
        }, 2000)
    } else {
        setTimeout(() => {
            finalizarQuizz()
            document.querySelector('.finalizar-jogo').scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 2000)
    }
    document.querySelectorAll(`.card-resposta.${id}`).forEach(card => card.removeAttribute('onclick'));
}

function finalizarQuizz() {
    let countLevels = 0
    levels.sort((a, b) => a.minValue - b.minValue)
    countAcertos = (countAcertos * 100) / document.querySelectorAll('.container-respostas').length;
    countAcertos = Math.round(countAcertos)

    for(let i = 0; i < levels.length; i++) {
        if(countAcertos >= levels[i].minValue) {
            countLevels++
        }
    }

    document.querySelector('.finalizar-jogo').innerHTML = `
        <div class="final-quizz">
            <div class="container-final">
                <div class="titulo-resultado">
                    <h3>${countAcertos}% de acerto: ${levels[countLevels - 1].title}</h3>
                </div>
                <div class="container-resultado">   
                    <img src="${levels[countLevels - 1].image}" alt="">
                    <div class="texto-resultado">
                        <p>${levels[countLevels - 1].text}</p>
                    </div>
                </div>
            </div>
            <div class="buttons-final">
                <button class="reiniciar-quizz" onclick="reiniciarQuizz()">Reiniciar Quizz</button>
                <button class="voltar-home" onclick="voltarHome()">Voltar pra home</button>
            </div>
        </div>
    `
}

function reiniciarQuizz() {
    obterQuizz()
    count = 0
    countAcertos = 0
    setTimeout(() => {
        document.querySelector('.top').scrollIntoView({ behavior: 'smooth', block: 'start' })
        document.querySelector('.finalizar-jogo').innerHTML = ''
    }, 1000)
}

function voltarHome() {
    document.querySelector('.jogando-quizz').classList.add('escondido')
    document.querySelector('.home').classList.remove('escondido')
}