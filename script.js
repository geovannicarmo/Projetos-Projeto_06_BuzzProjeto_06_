let renderizaCriarPerguntas=[]
let nniveis;
let titulo;
let url;
let nperguntas=1;
let questions=[];
let answers=[];
let levels=[];
let getLocal;
let quizzSelecionado = {}




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
    // titulo = response.data.title


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
    <div class="nperguntasInvalido escondido textoInputErro"> O valor informado não é uma URL válida</div>
   

    <input type="text" id="nniveis" name="firstname" placeholder="Quantidade de níveis do quizz
    ">
    <div class="nniveisInvalido escondido textoInputErro"> O valor informado não é uma URL válida</div>

</div>
<div onclick="infQuizz()" class="buttonInf">
    <p>Prosseguir pra criar perguntas</p>
</div>`


    element.innerHTML = pagina1
    
    if(Object.keys(quizzSelecionado).length > 0) {
        document.querySelector('#titulo').value = quizzSelecionado.data.title
        document.querySelector('#url').value = quizzSelecionado.data.image
        document.querySelector('#nperguntas').value = quizzSelecionado.data.questions.length
        document.querySelector('#nniveis').value = quizzSelecionado.data.levels.length
    }
}



  function criarPerguntas(){ 
    renderizaCriarPerguntas = []

    let element2=document.querySelector(".criaPerguntas")

    element2.innerHTML=""
    element2.innerHTML = "<h2>Crie suas perguntas</h2>"

    const temKeys = Object.keys(quizzSelecionado).length > 0
    const isMaior = (i, qtd) => quizzSelecionado.data.questions[i].answers.length > qtd
    
    for(let i=0; i<nperguntas;i++){
      
       
   
   renderizaCriarPerguntas[i] =`
 <div class="infQuizz perguntaI classe${i} ${i === 0 ? 'pergunta-selecionada' : ''}">
    <div class="expandirForm">
        <h3>Pergunta ${i+1}</h3>
        <img src="images/edit-icon.svg" alt="edit-icon" onclick="exibirPergunta(this)" />
    </div>

    <input type="text" id="tesxtPergunta" value="${temKeys ? quizzSelecionado.data.questions[i].title : ''}" name="firstname" placeholder="Texto da pergunta">

    <div class="tesxtPerguntaInvalido${i} escondido textoInputErro"> É necessário preencher o texto da pergunta.</div>

    <input type="color" id="corFundo" name="firstname" placeholder="Cor de fundo da pergunta
    ">
    <h3>Resposta correta</h3>
    <input type="text" id="RespCprreta" value="${temKeys ? quizzSelecionado.data.questions[i].answers[0].text : ''}" name="firstname" placeholder="Resposta correta
    ">
    <div class="tesxtrueInvalido${i} escondido textoInputErro"> É necessário preencher a resposta.</div>

    <input type="text" id="urlImg" value="${temKeys ? quizzSelecionado.data.questions[i].answers[0].image : ''}" name="firstname" placeholder="URL da imagem
    ">
    <div class="imagemtrueInvalido${i} escondido textoInputErro"> O valor informado não é uma URL válida</div>

    <h3>Respostas incorretas
    </h3>
    <input type="text" id="incorreta1" value="${temKeys ? quizzSelecionado.data.questions[i].answers[1].text : ''}" name="firstname" placeholder="Resposta incorreta 1
    ">
    <div class="tesxtfalseInvalido1${i} escondido textoInputErro"> É necessário preencher a resposta.</div>

    <input type="text" class="space" value="${temKeys ? quizzSelecionado.data.questions[i].answers[1].image : ''}" id="urlincorreta1" name="firstname" placeholder="URL da imagem 1
    ">
    <div class="imagemfalseInvalido1${i} escondido textoInputErro space"> O valor informado não é uma URL válida</div>

    <input type="text" id="incorreta2" value="${temKeys ? isMaior(i, 2) ? quizzSelecionado.data.questions[i].answers[2].text : '' : ''}" name="firstname" placeholder="Resposta incorreta 2
    ">
    <div class="tesxtfalseInvalido2${i} escondido textoInputErro"> É necessário preencher a resposta.</div>

    <input type="text" class="space" value="${temKeys ? isMaior(i, 2) ? quizzSelecionado.data.questions[i].answers[2].image : '' : ''}" id="urlincorreta2" name="firstname" placeholder="URL da imagem 2
    ">
    <div class="imagemfalseInvalido2${i} escondido textoInputErro"> O valor informado não é uma URL válida</div>

    <input type="text" id="incorreta3" value="${temKeys ? isMaior(i, 3) ? quizzSelecionado.data.questions[i].answers[3].text : '' : ''}" name="firstname" placeholder="Resposta incorreta 3
    ">
    <div class="tesxtfalseInvalido3${i} escondido textoInputErro"> É necessário preencher a resposta.</div>

    <input type="text" id="urlincorreta3" value="${temKeys ? isMaior(i, 3) ? quizzSelecionado.data.questions[i].answers[3].image : '' : ''}" name="firstname" placeholder="URL da imagem 3
    ">
    <div class="imagemfalseInvalido3${i} escondido textoInputErro"> O valor informado não é uma URL válida</div>

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
        elemento.parentElement.parentElement.style.position = 'relative';
        elemento.parentElement.parentElement.style.top = '-100px';
        elemento.parentElement.parentElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        elemento.parentElement.parentElement.style.position = 'initial';
    }, 500)
}

function exibirNivel(elemento) {
    const nivelSelecionado = document.querySelector('.nivel-selecionado')

    if(nivelSelecionado !== null) {
        nivelSelecionado.classList.remove('nivel-selecionado')
    }
    elemento.parentElement.parentElement.classList.add('nivel-selecionado')
    setTimeout(() => {
        elemento.parentElement.parentElement.style.position = 'relative';
        elemento.parentElement.parentElement.style.top = '-100px';
        elemento.parentElement.parentElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        elemento.parentElement.parentElement.style.position = 'initial';
    }, 500)
}


 
  
 
  
  function tratarPerguntas(){
    questions = []
    let preenchimentoincorreto=0;
   
    for(let idx=0; idx<nperguntas; idx++){
    answers = []

    classecriaPerguntas =document.querySelector(".criaPerguntas")

    tesxtPergunta= classecriaPerguntas.querySelector(`.classe${idx} #tesxtPergunta`).value
    
    tesxtPerguntainput=classecriaPerguntas.querySelector(`.classe${idx} #tesxtPergunta`)
    tesxtPerguntainput.classList.remove("red")

    let tesxtPerguntaInvalido= classecriaPerguntas.querySelector(`.tesxtPerguntaInvalido${idx}`)
    
    tesxtPerguntaInvalido.classList.add("escondido")

    corFundo= classecriaPerguntas.querySelector(`.classe${idx} #corFundo`).value

    if(tesxtPergunta.length<20){
        preenchimentoincorreto++
        tesxtPerguntainput.classList.add("red")
        tesxtPerguntaInvalido.classList.remove("escondido")
        }

    RespCprreta= classecriaPerguntas.querySelector(`.classe${idx} #RespCprreta`).value

    RespCprretainput=classecriaPerguntas.querySelector(`.classe${idx} #RespCprreta`)
    RespCprretainput.classList.remove("red")

    let tesxtrueInvalido= classecriaPerguntas.querySelector(`.tesxtrueInvalido${idx}`)
  
    tesxtrueInvalido.classList.add("escondido")

    urlImg= classecriaPerguntas.querySelector(`.classe${idx} #urlImg`).value

    urlImgInput=classecriaPerguntas.querySelector(`.classe${idx} #urlImg`)
    urlImgInput.classList.remove("red")

    let imagemtrueInvalido= classecriaPerguntas.querySelector(`.imagemtrueInvalido${idx}`)
   
    imagemtrueInvalido.classList.add("escondido")

  

        if(!isImage(urlImg) || urlImg === ""){ 

        preenchimentoincorreto++
        urlImgInput.classList.add("red")
        imagemtrueInvalido.classList.remove("escondido")
        }

        if(RespCprreta===""){

            preenchimentoincorreto++
            RespCprretainput.classList.add("red")
            tesxtrueInvalido.classList.remove("escondido")
        }

        answers.push({ 
            text: RespCprreta,
            image: urlImg,
            isCorrectAnswer: true
        })





    incorreta1= classecriaPerguntas.querySelector(`.classe${idx} #incorreta1`).value

    Respfalse1input=classecriaPerguntas.querySelector(`.classe${idx} #incorreta1`)
    Respfalse1input.classList.remove("red")

    let tesxtfalseInvalido1= classecriaPerguntas.querySelector(`.tesxtfalseInvalido1${idx}`)
    console.log(tesxtfalseInvalido1)
    tesxtfalseInvalido1.classList.add("escondido")

    urlincorreta1= classecriaPerguntas.querySelector(`.classe${idx} #urlincorreta1`).value

    urlfalse1Input=classecriaPerguntas.querySelector(`.classe${idx} #urlincorreta1`)
    urlfalse1Input.classList.remove("red")

    let imagemfalseInvalido1= classecriaPerguntas.querySelector(`.imagemfalseInvalido1${idx}`)
    
    imagemfalseInvalido1.classList.add("escondido")

    if (incorreta1!=="" || urlincorreta1!==""){

        if(!isImage(urlincorreta1) ){

            preenchimentoincorreto++
            urlfalse1Input.classList.add("red")
            imagemfalseInvalido1.classList.remove("escondido")

        }
        if(incorreta1===""){
            preenchimentoincorreto++
        Respfalse1input.classList.add("red")
        tesxtfalseInvalido1.classList.remove("escondido")
        }

        answers.push(  { 
            text: incorreta1,
            image: urlincorreta1,
            isCorrectAnswer: false
        })

    }


    incorreta2= classecriaPerguntas.querySelector(`.classe${idx} #incorreta2`).value

    Respfalse2input=classecriaPerguntas.querySelector(`.classe${idx} #incorreta2`)
    Respfalse2input.classList.remove("red")

    let tesxtfalseInvalido2= classecriaPerguntas.querySelector(`.tesxtfalseInvalido2${idx}`)
    tesxtfalseInvalido2.classList.add("escondido")

    urlincorreta2= classecriaPerguntas.querySelector(`.classe${idx} #urlincorreta2`).value

    urlfalse2Input=classecriaPerguntas.querySelector(`.classe${idx} #urlincorreta2`)
    urlfalse2Input.classList.remove("red")

    let imagemfalseInvalido2= classecriaPerguntas.querySelector(`.imagemfalseInvalido2${idx}`)
    
    imagemfalseInvalido2.classList.add("escondido")

    if (incorreta2!=="" || urlincorreta2!==""){

        if(!isImage(urlincorreta2) ){
            preenchimentoincorreto++
            urlfalse2Input.classList.add("red")
            imagemfalseInvalido2.classList.remove("escondido")

        }
        if(incorreta2===""){
            preenchimentoincorreto++
        Respfalse2input.classList.add("red")
        tesxtfalseInvalido2.classList.remove("escondido")

        
        }

        answers.push(  { 
            text: incorreta2,
            image: urlincorreta2,
            isCorrectAnswer: false
        })

    }

    incorreta3= classecriaPerguntas.querySelector(`.classe${idx} #incorreta3`).value
    
    Respfalse3input=classecriaPerguntas.querySelector(`.classe${idx} #incorreta3`)
    Respfalse3input.classList.remove("red")

    let tesxtfalseInvalido3= classecriaPerguntas.querySelector(`.tesxtfalseInvalido3${idx}`)
    tesxtfalseInvalido3.classList.add("escondido")

    urlincorreta3= classecriaPerguntas.querySelector(`.classe${idx} #urlincorreta3`).value

    urlfalse3Input=classecriaPerguntas.querySelector(`.classe${idx} #urlincorreta3`)
    urlfalse3Input.classList.remove("red")

    let imagemfalseInvalido3= classecriaPerguntas.querySelector(`.imagemfalseInvalido3${idx}`)
    
    imagemfalseInvalido3.classList.add("escondido")

    if (incorreta3!=="" || urlincorreta3!==""){

        if(!isImage(urlincorreta3) ){
            preenchimentoincorreto++


            urlfalse3Input.classList.add("red")
            imagemfalseInvalido3.classList.remove("escondido")

        }
        if(incorreta3===""){
            preenchimentoincorreto++
        Respfalse3input.classList.add("red")
        tesxtfalseInvalido3.classList.remove("escondido")

        
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

if(preenchimentoincorreto>0){
return console.log("falha no preenchimento")
}

if(answers.length < 2) {
    return alert('preencha pelo menos 2 campos')
} 
    
    questions.push(objetopergunta)


}

if(preenchimentoincorreto>0){
    return console.log("falha no preenchimento")
    }
    
    if(answers.length < 2) {
        return alert('preencha pelo menos 2 campos')
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

    const temKeys = Object.keys(quizzSelecionado).length > 0


    for(let id=0; id<nniveis; id++){

   renderizaCriarniveis[id] =`
   <div class="infQuizz niveisI classeN${id} ${id === 0 ? 'nivel-selecionado': ''}">
   <div class="expandirForm">
        <h3>Nível ${id+1}</h3>
        <img src="images/edit-icon.svg" alt="edit-icon" onclick="exibirNivel(this)" />
   </div>
   <input type="text" id="TituloNivel" value="${temKeys ? quizzSelecionado.data.levels[id].title : ''}" name="firstname" placeholder="Título do nível"/>
   <div class="escondido TNivelInvalido${id} textoInputErro"> É necessário que o título do nivel tenha ao menos 20 caracteres. </div>

   <input type="text" id="acertoMinimo" value="${temKeys ? quizzSelecionado.data.levels[id].minValue : ''}" name="firstname" placeholder="% de acerto mínima
   ">
   <div class="escondido AMnivelInvalido${id} textoInputErro"> O percentual de acerto deve ser um valor entre 0 e 100. </div>

   <input type="text" id="imagemdonivel" value="${temKeys ? quizzSelecionado.data.levels[id].image : ''}" name="firstname" placeholder="URL da imagem do nível
   ">
   <div class="escondido IMGnivelInvalido${id} textoInputErro"> O valor informado não é uma URL válida </div>

  

   <textarea cols="30" rows="10" id="descricaoNivel" name="firstname" placeholder="Descrição do nível
   ">
  
   ${temKeys ? quizzSelecionado.data.levels[id].text : ''}</textarea>

   <div class="escondido DnivelInvalido${id} textoInputErro"> A descrição do nível deve ao menos 30 caracteres </div>

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
    acertoMinimoInput= document.querySelector(`.classeN${i} #acertoMinimo`)
    acertoMinimoInput.classList.remove("red")

    AMnivelInvalidoid=document.querySelector(`.AMnivelInvalido${i}`)
    console.log(AMnivelInvalidoid)
    AMnivelInvalidoid.classList.add("escondido")

    imagemdonivel= document.querySelector(`.classeN${i} #imagemdonivel`).value
    imagemdonivelInput= document.querySelector(`.classeN${i} #imagemdonivel`)
    imagemdonivelInput.classList.remove("red")

    IMGnivelInvalido=document.querySelector(`.IMGnivelInvalido${i}`)
    IMGnivelInvalido.classList.add("escondido")

    descricaoNivel= document.querySelector(`.classeN${i} #descricaoNivel`).value
    descricaoNivelInput= document.querySelector(`.classeN${i} #descricaoNivel`)
    descricaoNivelInput.classList.remove("red")

    DnivelInvalido=document.querySelector(`.DnivelInvalido${i}`)
    console.log(DnivelInvalido)
    DnivelInvalido.classList.add("escondido")

    if(TituloNivel.length<10){
        TituloNivelInput.classList.add("red")
        TNivelInvalidoid.classList.remove("escondido")
    }

    if (acertoMinimo<0||acertoMinimo>100|| isNaN(acertoMinimo) || acertoMinimo===""){
        acertoMinimoInput.classList.add("red")
        AMnivelInvalidoid.classList.remove("escondido")
        
    }
    if(!isImage(imagemdonivel)){
    IMGnivelInvalido.classList.remove("escondido")
    imagemdonivelInput.classList.add("red")
    console.log("gggg")
    }

    if(descricaoNivel.length<30){
        console.log("gggg")
        descricaoNivelInput.classList.add("red")
        DnivelInvalido.classList.remove("escondido")
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
            return alert("É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%")
        }

        if(!(TituloNivel.length<10||acertoMinimo<0||acertoMinimo>100|| isNaN(acertoMinimo) || acertoMinimo===""|| descricaoNivel.length<30||!isImage(imagemdonivel))){
        
        
        

    enviaQuizz ={
        title: titulo,
        image: url,
        questions: questions,
        levels

    }
    
    const temKey = Object.keys(quizzSelecionado).length > 0

    if(temKey) {
        const requisicao = axios.put(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${quizzSelecionado.data.id}`, enviaQuizz, {
            headers: { "Secret-Key": quizzSelecionado.secretKey }
        });
        requisicao.then(respostaAPI);
    } else {
        const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/', enviaQuizz);
        requisicao.then(respostaAPI);
    }
    }

}



function QuizzPronto(id){

    let element3=document.querySelector(".criaNiveis")
    element3.classList.add("escondido")

let element4=document.querySelector(".sucessoQuizz")
element4.classList.remove("escondido")


Quizzhtml =`<h2>Seu quizz está pronto!</h2>
<div class="imagiQuizzCriado" onclick="obterQuizz(${id})" style="${background(url, opacidadeLinearBottom, true)}">
<p id="legendaimagiQuizzCriado" >${titulo}</p>
</div>
<div onclick="obterQuizz(${id})" class="buttonInf buttonAcessarQuizz">
    <p>Acessar Quizz</p>
</div>
<p id="voltaHome" onclick="voltarHome()">Voltar pra home</p>`

element4.innerHTML=Quizzhtml

    document.querySelector("#titulo").value = ''
    document.querySelector("#url").value = ''
    document.querySelector("#nperguntas").value = ''
    document.querySelector("#nniveis").value = ''

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
    if(Object.keys(quizzSelecionado).length > 0) {
        localStorage.setItem('localIdsSecretKeys', JSON.stringify(getLocal))
        QuizzPronto(resposta.data.id)
    } else {
        getLocal.push({ id: resposta.data.id, SecretKey: resposta.data.key })
        localStorage.setItem('localIdsSecretKeys', JSON.stringify(getLocal))
        QuizzPronto(resposta.data.id)
    }
}


console.log(localStorage.getItem('localIdsSecretKeys'))





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
    const promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${id}`)

    promise.then(response => {
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
    console.log(countAcertos)
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

// -------------------- Tela 1 - Tela de Quizzes ------------------------

function criarQuizz() {
    document.querySelector('.home').classList.add('escondido')
    document.querySelector('.infBasic').classList.remove('escondido')
    comeco()
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