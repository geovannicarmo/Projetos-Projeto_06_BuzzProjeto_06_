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
        console.log(response.data)
        document.querySelector('.container-jogando').innerHTML = `
            <div class="quizz-principal" style="${background(response)}">
                <h1>${response.data.title}</h1>
            </div>
            <div class="perguntas-quizz">
            </div>
        `
        const questions = response.data.questions

        for(let i = 0; i < questions.length; i++) {
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
            console.log(questoesSortidas)

            for(let j = 0; j < questions[i].answers.length; j++) {
                document.querySelectorAll('.container-respostas')[i].innerHTML += `
                    <div class="card-resposta">
                        <img src="${questoesSortidas[j].image}" alt="">
                        <p>${questoesSortidas[j].text}</p>
                    </div>
                `
            }
        }
    })
}
obterQuizz()