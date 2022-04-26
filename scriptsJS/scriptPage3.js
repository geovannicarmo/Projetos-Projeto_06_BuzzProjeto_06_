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
let Loading=document.querySelector(".carregando")


function falha(){
    alert("Preencha os dados corretamente")
}


function isImage(url){

    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
  }


function infQuizz(){
    titulo=document.querySelector("#titulo").value
    
    url=document.querySelector("#url").value
    
    nperguntas=document.querySelector("#nperguntas").value
   
    
    nniveis=document.querySelector("#nniveis").value

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
    <div class="nperguntasInvalido escondido textoInputErro"> É necessário criar ao menos 3 perguntas.</div>
   

    <input type="text" id="nniveis" name="firstname" placeholder="Quantidade de níveis do quizz
    ">
    <div class="nniveisInvalido escondido textoInputErro"> É necessário criar ao menos 2 níveis.</div>

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
        tesxtPerguntainput.scrollIntoView({ behavior: 'smooth', block: 'center' })
        document.querySelector('.pergunta-selecionada').classList.remove('pergunta-selecionada')
        document.querySelectorAll(`.infQuizz.perguntaI`)[idx].classList.add("pergunta-selecionada")
        return
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
        urlImgInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
        document.querySelector('.pergunta-selecionada').classList.remove('pergunta-selecionada')
        document.querySelectorAll(`.infQuizz.perguntaI`)[idx].classList.add("pergunta-selecionada")
        return 
        }

        if(RespCprreta===""){

            preenchimentoincorreto++
            RespCprretainput.classList.add("red")
            tesxtrueInvalido.classList.remove("escondido")
            tesxtrueInvalido.scrollIntoView({ behavior: 'smooth', block: 'center' })
            document.querySelector('.pergunta-selecionada').classList.remove('pergunta-selecionada')
            document.querySelectorAll(`.infQuizz.perguntaI`)[idx].classList.add("pergunta-selecionada")
            return 
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

if(answers.length < 2) {
    document.querySelectorAll(`.infQuizz.perguntaI`)[idx].scrollIntoView({ behavior: 'smooth', block: 'center' })
    document.querySelector('.pergunta-selecionada').classList.remove('pergunta-selecionada')
    document.querySelectorAll(`.infQuizz.perguntaI`)[idx].classList.add("pergunta-selecionada")
    return alert('Preencha pelo menos 2 respostas')
} 
    
    questions.push(objetopergunta)


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
   <div class="escondido TNivelInvalido${id} textoInputErro"> É necessário que o título do nivel tenha ao menos 10 caracteres. </div>

   <input type="text" id="acertoMinimo" value="${temKeys ? quizzSelecionado.data.levels[id].minValue : ''}" name="firstname" placeholder="% de acerto mínima
   ">
   <div class="escondido AMnivelInvalido${id} textoInputErro"> O percentual de acerto deve ser um valor entre 0 e 100. </div>

   <input type="text" id="imagemdonivel" value="${temKeys ? quizzSelecionado.data.levels[id].image : ''}" name="firstname" placeholder="URL da imagem do nível
   ">
   <div class="escondido IMGnivelInvalido${id} textoInputErro"> O valor informado não é uma URL válida </div>

  

   <textarea cols="30" rows="10" id="descricaoNivel" name="firstname" placeholder="Descrição do nível
   ">${temKeys ? quizzSelecionado.data.levels[id].text: '' }</textarea>

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
   
    DnivelInvalido.classList.add("escondido")

    if(TituloNivel.length<10){
        TituloNivelInput.classList.add("red")
        TNivelInvalidoid.classList.remove("escondido")
        TituloNivelInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
        document.querySelector('.nivel-selecionado').classList.remove('nivel-selecionado')
        document.querySelectorAll(`.infQuizz.niveisI`)[i].classList.add("nivel-selecionado")
        return 
    }

    if (acertoMinimo<0||acertoMinimo>100|| isNaN(acertoMinimo) || acertoMinimo===""){
        acertoMinimoInput.classList.add("red")
        AMnivelInvalidoid.classList.remove("escondido")
        acertoMinimoInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
        document.querySelector('.nivel-selecionado').classList.remove('nivel-selecionado')
        document.querySelectorAll(`.infQuizz.niveisI`)[i].classList.add("nivel-selecionado")
        return 
        
    }
    if(!isImage(imagemdonivel)){
    IMGnivelInvalido.classList.remove("escondido")
    imagemdonivelInput.classList.add("red")
    imagemdonivelInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
    document.querySelector('.nivel-selecionado').classList.remove('nivel-selecionado')
    document.querySelectorAll(`.infQuizz.niveisI`)[i].classList.add("nivel-selecionado")
    return 
    }

    if(descricaoNivel.length<30){  
        descricaoNivelInput.classList.add("red")
        DnivelInvalido.classList.remove("escondido")
        descricaoNivelInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
        document.querySelector('.nivel-selecionado').classList.remove('nivel-selecionado')
        document.querySelectorAll(`.infQuizz.niveisI`)[i].classList.add("nivel-selecionado")
        return 
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

        let element3=document.querySelector(".criaNiveis")
        element3.classList.add("escondido")

        
        Loading.classList.remove("escondido")


        const requisicao = axios.put(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${quizzSelecionado.data.id}`, enviaQuizz, {
            headers: { "Secret-Key": quizzSelecionado.secretKey }
        });

        requisicao.then(respostaAPI);
    } else {
        let element3=document.querySelector(".criaNiveis")
        element3.classList.add("escondido")
        Loading.classList.remove("escondido")
        const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/', enviaQuizz);
        requisicao.then(respostaAPI);
    }
    }

}

function QuizzPronto(id){

    let element3=document.querySelector(".criaNiveis")
    element3.classList.add("escondido")

    Loading.classList.add("escondido")

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

let local=[];

function respostaAPI(resposta){
    if(localStorage.getItem('localIdsSecretKeys') === null ||localStorage.getItem('localIdsSecretKeys')==="undefined") {
        localStorage.setItem('localIdsSecretKeys', JSON.stringify(local))
    }
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