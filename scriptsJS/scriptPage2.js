// -------------------- Tela 2 - Jogando Quizz ------------------------
let questoesSortidas = []
let levelsJogando = []
let idAtual;
const opacidadeLinear = 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),'
const opacidadeLinearBottom = 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%),'
const background = (response, opacidade, center = false) => `
    background: ${opacidade} url(${response}); 
    background-repeat: no-repeat;
    background-size: 100%;
    object-fit: cover;
    ${center === true ? 'background-position: center;' : ''}
`

function embaralhar() {
    return Math.random() - 0.5;
}

function obterQuizz(id) {
    idAtual = id
    document.querySelector(".sucessoQuizz").classList.add('escondido')
    document.querySelector('.home').classList.add('escondido')
    document.querySelector('.jogando-quizz').classList.remove('escondido')
    Loading.classList.remove("escondido")
    const promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${id}`)

    promise.then(response => {
        Loading.classList.add("escondido")
        levelsJogando = response.data.levels
        document.querySelector('.container-jogando').innerHTML = `
            <div class="quizz-principal" style="${background(response.data.image, opacidadeLinear)}">
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

let count = 0;
let countRapido = 0;
let countAcertos = 0;

function selecionarResposta(resposta, perguntaId) {
    if(resposta.classList.contains('true')) countAcertos++

    for(let i = 0; i < document.querySelectorAll(`.card-resposta.${perguntaId}`).length; i++) {
        if(document.querySelectorAll(`.card-resposta.${perguntaId}`)[i] !== resposta) {
            document.querySelectorAll(`.card-resposta.${perguntaId}`)[i].classList.add('opacity')
        }

        if(document.querySelectorAll(`.card-resposta.${perguntaId}`)[i].classList.contains('true')) {
            document.querySelectorAll(`.card-resposta.${perguntaId}`)[i].querySelector('p').style.color = '#009C22'
        } else {
            document.querySelectorAll(`.card-resposta.${perguntaId}`)[i].querySelector('p').style.color = '#FF0B0B'
        }
    }
    countRapido += 1
    if(countRapido === document.querySelectorAll('.container-perguntas').length) {
        setTimeout(() => {
            finalizarQuizz()
            document.querySelector('.finalizar-jogo').scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 1500)
    } 

    if(document.querySelectorAll('.container-perguntas')[count].nextElementSibling !== null) {
        setTimeout(() => {
            document.querySelectorAll('.container-perguntas')[count].nextElementSibling.scrollIntoView({ behavior: 'smooth', block: 'center' });
            count += 1
        }, 1500)
    } else {
        setTimeout(() => {
            finalizarQuizz()
            document.querySelector('.finalizar-jogo').scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 1500)
    }

    document.querySelectorAll(`.card-resposta.${perguntaId}`).forEach(card => card.removeAttribute('onclick'));
}

function finalizarQuizz() {
    let countLevels = 0
    levelsJogando.sort((a, b) => a.minValue - b.minValue)
    let countFinal = (countAcertos * 100) / document.querySelectorAll('.container-respostas').length;
    countFinal = Math.round(countFinal)

    for(let i = 0; i < levelsJogando.length; i++) {
        if(countFinal >= levelsJogando[i].minValue) {
            countLevels++
        }
    }

    document.querySelector('.finalizar-jogo').innerHTML = `
        <div class="final-quizz">
            <div class="container-final">
                <div class="titulo-resultado">
                    <h3>${countFinal}% de acerto: ${levelsJogando[countLevels - 1].title}</h3>
                </div>
                <div class="container-resultado">   
                    <img src="${levelsJogando[countLevels - 1].image}" alt="">
                    <div class="texto-resultado">
                        <p>${levelsJogando[countLevels - 1].text}</p>
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
    obterQuizz(idAtual)
    countRapido = 0
    count = 0
    countAcertos = 0
    setTimeout(() => {
        document.querySelector('.jogando-quizz').style.position = 'relative';
        document.querySelector('.jogando-quizz').style.top = '-100px';
        document.querySelector('.jogando-quizz').scrollIntoView({ behavior: 'smooth', block: 'start' })
        document.querySelector('.jogando-quizz').style.position = 'initial';
        document.querySelector('.jogando-quizz').style.top = '0';
        document.querySelector('.finalizar-jogo').innerHTML = ''
    }, 1000)
}

function voltarHome() {
    count = 0
    countAcertos = 0
    quizzSelecionado = {}
    document.querySelector('.finalizar-jogo').innerHTML = ''
    document.querySelector('.jogando-quizz').classList.add('escondido')
    document.querySelector('.home').classList.remove('escondido')
    document.querySelector('.sucessoQuizz').classList.add('escondido')
    
    carregarTodosQuizzes()
    carregarQuizzesUsuario()
}