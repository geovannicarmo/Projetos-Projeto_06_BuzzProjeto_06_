let renderizaCriarPerguntas=[]
let nniveis;
let titulo;
let url;
let nperguntas=1;
let questions=[];
let answers=[];
let getLocal;




function falha(){
    alert("Preencha os dados corretamente")
}



function isImage(url){

    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
  }

  /*function isclolor(corFundo){
      if(corFundo[0]!=="#" || corFundo.length!==7){
          return false;
      }
      let inputString = corFundo.replace(/^./, ""); 
      let re = /[0-9A-Fa-f]{6}/g;
      
      if(re.test(inputString)) {
         return true
      } else {
          return false
      }
  }*/

function infQuizz(){
    titulo=document.querySelector("#titulo").value
    
    url=document.querySelector("#url").value
    
    nperguntas=document.querySelector("#nperguntas").value
   
    
    nniveis=document.querySelector("#nniveis").value
    
    console.log(nperguntas)

    inputInvalido=document.querySelector(".inputInvalido")
    inputInvalido.classList.add("escondido")
    tituloRed=document.querySelector("#titulo")
    tituloRed.classList.remove("red")

    urlInvalido=document.querySelector(".urlInvalido")
    urlInvalido.classList.add("escondido")
    urlRed=document.querySelector("#url")
    urlRed.classList.remove("red")

    nperguntasInvalido=document.querySelector(".nperguntasInvalido")
    nperguntasInvalido.classList.add("escondido")
    nperguntasred=document.querySelector("#nperguntas")
    nperguntasred.classList.remove("red")

    nniveisInvalido=document.querySelector(".nniveisInvalido")
    nniveisInvalido.classList.add("escondido")
    nniveisred=document.querySelector("#nniveis")
    nniveisred.classList.remove("red")

    if(titulo.length<20 || titulo.length>65){
        inputInvalido.classList.remove("escondido")
        tituloRed.classList.add("red")
       
    }

    if(!isImage(url)){

        urlInvalido.classList.remove("escondido")
        urlRed.classList.add("red")
    }

    if(nperguntas<3 || isNaN(nperguntas)){

        nperguntasInvalido.classList.remove("escondido")
        nperguntasred.classList.add("red")
    }

    if(nniveis<2 || isNaN(nniveis)){
        nniveisInvalido.classList.remove("escondido")
        nniveisred.classList.add("red")
    }




    if(!(titulo.length<20 || titulo.length>65 || nperguntas<3 || isNaN(nperguntas) ||nniveis<2 || isNaN(nniveis) || !isImage(url))){
    

        let infBasic = document.querySelector(".infBasic")
        infBasic.classList.add("escondido")

        let criaPerguntas=document.querySelector(".criaPerguntas")
        criaPerguntas.classList.remove("escondido")

        criarPerguntas()
    }
}

function comeco() {
    element = document.querySelector(".infBasic")


    pagina1 = `
<h2>Comece pelo começo</h2>
<div class="infQuizz info">
    <input type="text" id="titulo" name="firstname" placeholder="Título do seu quizz">
    <div class="inputInvalido escondido textoInputErro"> O título deve ter entre 20 e 65 caracteres</div>

    <input type="text" id="url" name="firstname" placeholder="URL da imagem do seu quizz
    ">
    <div class="urlInvalido escondido textoInputErro"> O valor informado não é uma URL válida</div>

    <input type="text" id="nperguntas" name="firstname" placeholder="Quantidade de perguntas do quizz
    ">
   

    <input type="text" id="nniveis" name="firstname" placeholder="Quantidade de níveis do quizz
    ">
    <div class="nniveisInvalido escondido textoInputErro"> O valor informado não é uma URL válida</div>

</div>
<div onclick="infQuizz()" class="buttonInf">
    <p>Prosseguir pra criar perguntas</p>
</div>`

    element.innerHTML = pagina1

}



  function criarPerguntas(){ 
    renderizaCriarPerguntas = []

    let element2=document.querySelector(".criaPerguntas")

    element2.innerHTML=""
    element2.innerHTML = "<h2>Crie suas perguntas</h2>"
    
    for(let i=0; i<nperguntas;i++){
      
       
   
   renderizaCriarPerguntas[i] =`
 <div class="infQuizz perguntaI classe${i} ${i === 0 ? 'pergunta-selecionada' : ''}">
    <div>
        <h3>Pergunta ${i+1}</h3>
        <img src="images/edit-icon.svg" alt="edit-icon" onclick="exibirPergunta(this)" />
    </div>
    <input type="text" id="tesxtPergunta" name="firstname" placeholder="Texto da pergunta">
    <input type="color" id="corFundo" name="firstname" placeholder="Cor de fundo da pergunta
    ">
    <h3>Resposta correta</h3>
    <input type="text" id="RespCprreta" name="firstname" placeholder="Resposta correta
    ">
    <input type="text" id="urlImg" name="firstname" placeholder="URL da imagem
    ">
    <h3>Respostas incorretas
    </h3>
    <input type="text" id="incorreta1" name="firstname" placeholder="Resposta incorreta 1
    ">
    <input type="text" class="space" id="urlincorreta1" name="firstname" placeholder="URL da imagem 1
    ">
    <input type="text" id="incorreta2" name="firstname" placeholder="Resposta incorreta 2
    ">
    <input type="text" class="space" id="urlincorreta2" name="firstname" placeholder="URL da imagem 2
    ">
    <input type="text" id="incorreta3" name="firstname" placeholder="Resposta incorreta 3
    ">
    <input type="text" id="urlincorreta3" name="firstname" placeholder="URL da imagem 3
    ">
</div>`

        
    element2.innerHTML+=renderizaCriarPerguntas[i]
}

    let butãoEnviaperguntas = `<div onclick="tratarPerguntas()" class="buttonInf">
    <p>Prosseguir pra criar níveis</p>
</div`
element2.innerHTML+=butãoEnviaperguntas




  }

function exibirPergunta(elemento) {
    const perguntaSelecionada = document.querySelector('.pergunta-selecionada')

    if(perguntaSelecionada !== null) {
        perguntaSelecionada.classList.remove('pergunta-selecionada')
    }
    elemento.parentElement.parentElement.classList.add('pergunta-selecionada')
    setTimeout(() => {
        elemento.parentElement.querySelector('h3').scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 500)
}

function exibirNivel(elemento) {
    const nivelSelecionado = document.querySelector('.nivel-selecionado')

    if(nivelSelecionado !== null) {
        nivelSelecionado.classList.remove('nivel-selecionado')
    }
    elemento.parentElement.parentElement.classList.add('nivel-selecionado')
    setTimeout(() => {
        elemento.parentElement.querySelector('h3').scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 500)
}


 
  
 
  
  function tratarPerguntas(){
    questions = []
   
    for(let idx=0; idx<nperguntas; idx++){
    answers = []

    classecriaPerguntas =document.querySelector(".criaPerguntas")

    tesxtPergunta= classecriaPerguntas.querySelector(`.classe${idx} #tesxtPergunta`).value
    

    corFundo= classecriaPerguntas.querySelector(`.classe${idx} #corFundo`).value

    if(tesxtPergunta.length<20){
        return alert("falha")}

    RespCprreta= classecriaPerguntas.querySelector(`.classe${idx} #RespCprreta`).value

    urlImg= classecriaPerguntas.querySelector(`.classe${idx} #urlImg`).value

if (RespCprreta!=="" && urlImg!==""){

    if(!isImage(urlImg) || RespCprreta==="" || urlImg === ""){
      
        return alert("falha1")
    }

    answers.push({ 
        text: RespCprreta,
        image: urlImg,
        isCorrectAnswer: true
    })

} else {
    return alert('falha1 dois campos')
}

    incorreta1= classecriaPerguntas.querySelector(`.classe${idx} #incorreta1`).value

    urlincorreta1= classecriaPerguntas.querySelector(`.classe${idx} #urlincorreta1`).value

    if (incorreta1!=="" || urlincorreta1!==""){

        if(!isImage(urlincorreta1) || incorreta1===""){
       
            return alert("falha2")
        }

        answers.push(  { 
            text: incorreta1,
            image: urlincorreta1,
            isCorrectAnswer: false
        })

    }


    incorreta2= classecriaPerguntas.querySelector(`.classe${idx} #incorreta2`).value

    urlincorreta2= classecriaPerguntas.querySelector(`.classe${idx} #urlincorreta2`).value

    if (incorreta2!=="" || urlincorreta2!==""){

        if(!isImage(urlincorreta2) || incorreta2===""){
       
            return alert("falha3")
        }

        answers.push(  { 
            text: incorreta2,
            image: urlincorreta2,
            isCorrectAnswer: false
        })

    }

    incorreta3= classecriaPerguntas.querySelector(`.classe${idx} #incorreta3`).value

    urlincorreta3= classecriaPerguntas.querySelector(`.classe${idx} #urlincorreta3`).value

    if (incorreta3!=="" || urlincorreta3!==""){

        if(!isImage(urlincorreta3) || incorreta3===""){
       
            return alert("falha4")
        }

        answers.push(  { 
            text: incorreta3,
            image: urlincorreta3,
            isCorrectAnswer: false
        })

    }



   

let objetopergunta ={
    title: tesxtPergunta,
    color: corFundo,
    answers

}

if(answers.length < 2) {
    return alert('preencha pelo menos 2 campos')
} 
    
    questions.push(objetopergunta)


}
    
   
    return criarNiveis()

  

    

  }



  function criarNiveis(){ 

    let criaPerguntas=document.querySelector(".criaPerguntas")
    criaPerguntas.classList.add("escondido")

    let element3=document.querySelector(".criaNiveis")
    element3.classList.remove("escondido")
    let renderizaCriarniveis=[]

    element3.innerHTML=""
    element3.innerHTML = "<h2>Agora, decida os níveis!</h2>"


    for(let id=0; id<nniveis; id++){

   renderizaCriarniveis[id] =`
   <div class="infQuizz niveisI classeN${id} ${id === 0 ? 'nivel-selecionado': ''}">
   <div>
        <h3>Nível ${id+1}</h3>
        <img src="images/edit-icon.svg" alt="edit-icon" onclick="exibirNivel(this)" />
   </div>
   <input type="text" id="TituloNivel" name="firstname" placeholder="Título do nível">
   <div class="TNivelInvalido${id} textoInputErro escondido"> O titilodonuveltem que ter 20cac </div>
   

   <input type="text" id="acertoMinimo" name="firstname" placeholder="% de acerto mínima
   ">

   <div class="TNivelInvalido${id} textoInputErro escondido"> O titilodonuveltem que ter 20cac </div>
   <input type="text" id="imagemdonivel" name="firstname" placeholder="URL da imagem do nível
   ">
   <textarea cols="30" rows="10" id="descricaoNivel" name="firstname" placeholder="Descrição do nível
   "></textarea>
</div>`
element3.innerHTML+=renderizaCriarniveis[id]

    }

    let butãoEnviaperguntas = `<div onclick="tratarNiveis()" class="buttonInf">
    <p>Finalizar Quizz</p>
</div`
element3.innerHTML+=butãoEnviaperguntas


   
}



function tratarNiveis(){
    levels=[]
    let cont=0

        for(let i=0; i<nniveis; i++){

    TituloNivel= document.querySelector(`.classeN${i} #TituloNivel`).value
    TituloNivelInput= document.querySelector(`.classeN${i} #TituloNivel`)
    TituloNivelInput.classList.remove("red")

    let TNivelInvalidoid= document.querySelector(`.TNivelInvalido${i}`)
    TNivelInvalidoid.classList.add("escondido")

    acertoMinimo= document.querySelector(`.classeN${i} #acertoMinimo`).value

    imagemdonivel= document.querySelector(`.classeN${i} #imagemdonivel`).value
    descricaoNivel= document.querySelector(`.classeN${i} #descricaoNivel`).value

    if(TituloNivel.length<10){
        TituloNivelInput.classList.add("red")
        TNivelInvalidoid.classList.remove("escondido")
    }

    if(TituloNivel.length<10||acertoMinimo<0||acertoMinimo>100|| isNaN(acertoMinimo) || acertoMinimo===""|| descricaoNivel.length<30||!isImage(imagemdonivel)){
        return alert("Preencha os dados corretamente.")
    }

    
    if (acertoMinimo==0){
       
        cont++
    }

    levels.push(
        {
            title: TituloNivel,
            image: imagemdonivel,
            text: descricaoNivel,
            minValue: acertoMinimo

    
        }
    )
        }

        if(cont===0){
            return alert("Preencha os dados corretamente.")
        }

   

    enviaQuizz ={
        title: titulo,
        image: url,
        questions: questions,
        levels

    }
    

    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes', enviaQuizz);

    requisicao.then(respostaAPI);
}



function QuizzPronto(id){

    let element3=document.querySelector(".criaNiveis")
    element3.classList.add("escondido")

let element4=document.querySelector(".sucessoQuizz")
element4.classList.remove("escondido")


Quizzhtml =`<h2>Seu quizz está pronto!</h2>
<div class="imagiQuizzCriado">
<img onclick="obterQuizz(${id})" src="${url}" alt="">
<p id="legendaimagiQuizzCriado" >${titulo}</p>
</div>
<div onclick="obterQuizz(${id})" class="buttonInf buttonAcessarQuizz">
    <p>Acessar Quizz</p>
</div>
<p id="voltaHome" onclick="voltarHome()">Voltar pra home</p>`

element4.innerHTML=Quizzhtml

}


function abrirQuizzCriado(){
    console.log("vai")
}

let local=[];

function respostaAPI(resposta){
    console.log(resposta.data)
  

    if(localStorage.getItem('localIdsSecretKeys') === null ||localStorage.getItem('localIdsSecretKeys')==="undefined") {
        localStorage.setItem('localIdsSecretKeys', JSON.stringify(local))
        console.log("entrei")
        console.log(localStorage.setItem('localIdsSecretKeys', JSON.stringify(local)))
    }
console.log(JSON.parse(localStorage.getItem('localIdsSecretKeys')))
    getLocal = JSON.parse(localStorage.getItem('localIdsSecretKeys'))

    getLocal.push({ id: resposta.data.id, SecretKey: resposta.data.key })
    localStorage.setItem('localIdsSecretKeys', JSON.stringify(getLocal))
    QuizzPronto(resposta.data.id)
}



comeco()
console.log(localStorage.getItem('localIdsSecretKeys'))





// -------------------- Tela 2 - Jogando Quizz ------------------------
let questoesSortidas = []
let levels = []
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
    const promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${id}`)

    promise.then(response => {
        levels = response.data.levels
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
    document.querySelectorAll(`.card-resposta.${perguntaId}`).forEach(card => card.removeAttribute('onclick'));
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
    obterQuizz(idAtual)
    count = 0
    countAcertos = 0
    setTimeout(() => {
        document.querySelector('.top').scrollIntoView({ behavior: 'smooth', block: 'start' })
        document.querySelector('.finalizar-jogo').innerHTML = ''
    }, 1000)
}

function voltarHome() {
    count = 0
    countAcertos = 0
    document.querySelector('.finalizar-jogo').innerHTML = ''
    document.querySelector('.jogando-quizz').classList.add('escondido')
    document.querySelector('.home').classList.remove('escondido')
    document.querySelector('.sucessoQuizz').classList.add('escondido')
    document.querySelector("#titulo").value = ''
    document.querySelector("#url").value = ''
    document.querySelector("#nperguntas").value = ''
    document.querySelector("#nniveis").value = ''
    carregarTodosQuizzes()
    carregarQuizzesUsuario()
}

// -------------------- Tela 1 - Tela de Quizzes ------------------------

function criarQuizz() {
    document.querySelector('.home').classList.add('escondido')
    document.querySelector('.infBasic').classList.remove('escondido')
}

function carregarTodosQuizzes() {
    document.querySelector('.todos-quizzes > div').innerHTML = ''
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes')

    promise.then(response => {
        console.log(response.data)
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
        console.log(getLocal.length === 0)

        if(getLocal.length === 0) {
            localStorage.removeItem('localIdsSecretKeys')
        } else {
            localStorage.setItem('localIdsSecretKeys', JSON.stringify(getLocal))
        }

        axios.delete(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${id}`, { headers: { "Secret-Key": secretKey } })
        voltarHome()
    }
}


carregarTodosQuizzes()
carregarQuizzesUsuario()