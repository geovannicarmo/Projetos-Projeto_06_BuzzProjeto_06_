let renderizaCriarPerguntas=[]




function isImage(url){

    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
  }

  function isclolor(corFundo){
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

  }

function infQuizz(){
    let titulo=document.querySelector("#titulo")
    
    let url=document.querySelector("#url")
    
    let nperguntas=document.querySelector("#nperguntas")
    
    let nniveis=document.querySelector("#nniveis")
    



    if(titulo.value.length<20 || titulo.value.length>65 || nperguntas.value<3 || isNaN(nperguntas.value) ||nniveis.value<2 || isNaN(nniveis.value) || !isImage(url.value)){
       
        


        alert("Preencha os dados corretamente.")
    }
    else{
       
        let infBasic =document.querySelector(".infBasic")
        infBasic.classList.add("escondido")
    }
}

function comeco(){
    element= document.querySelector(".infBasic")
   
    
    pagina1=`

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

element.innerHTML=pagina1

}



  function criarPerguntas(){ 

    let element2=document.querySelector(".criaPerguntas")
    let nperguntas=2;
    for(let i=0; i<nperguntas;i++){
      
   
   
   renderizaCriarPerguntas[i] =`

 <div class="infQuizz perguntaI classe${i}">

    <h3>Pergunta ${i+1}</h3>

    <input type="text" id="tesxtPergunta" name="firstname" placeholder="    Texto da pergunta">
    <input type="text" id="corFundo" name="firstname" placeholder="    Cor de fundo da pergunta
    ">

    <h3>Resposta correta</h3>

    <input type="text" id="RespCprreta" name="firstname" placeholder="    Resposta correta
    ">
    <input type="text" id="urlImg" name="firstname" placeholder="    URL da imagem
    ">

    <h3>Respostas incorretas
    </h3>

    <input type="text" id="incorreta1" name="firstname" placeholder="    Resposta incorreta 1
    ">
    <input type="text" class="space" id="urlincorreta1" name="firstname" placeholder="    URL da imagem 1
    ">

    <input type="text" id="incorreta2" name="firstname" placeholder="    Resposta incorreta 2
    ">
    <input type="text" class="space" id="urlincorreta2" name="firstname" placeholder="    URL da imagem 2
    ">

    <input type="text" id="incorreta3" name="firstname" placeholder="    Resposta incorreta 3
    ">
    <input type="text" id="urlincorreta3" name="firstname" placeholder="    URL da imagem 3
    ">

</div>`


  

element2.innerHTML+=renderizaCriarPerguntas[i]
    }

    let butãoEnviaperguntas = `<div onclick="tratarPerguntas()" class="buttonInf">

    <p>Prosseguir pra criar níveis</p>

</div`
element2.innerHTML+=butãoEnviaperguntas




  }


 let deus=2
 let idx=deus
 let questions=[]
 
  
  function tratarPerguntas(){
   
    for(let idx=0; idx<deus; idx++){
   

    classecriaPerguntas =document.querySelector(".criaPerguntas")

    tesxtPergunta= classecriaPerguntas.querySelector(`.classe${idx} #tesxtPergunta`).value
    console.log(tesxtPergunta)

    corFundo= classecriaPerguntas.querySelector(`.classe${idx} #corFundo`).value

    if(tesxtPergunta.length<20 || !isclolor(corFundo)){
        return alert("falha")}

    RespCprreta= classecriaPerguntas.querySelector(`.classe${idx} #RespCprreta`).value

    urlImg= classecriaPerguntas.querySelector(`.classe${idx} #urlImg`).value

let answers=[];

if (RespCprreta!=="" || urlImg!==""){

    if(!isImage(urlImg) || RespCprreta===""){
        console.log(urlImg)
        console.log(isImage(urlImg))
        return alert("falha1")
    }

    answers.push(  { 
        text: RespCprreta,
        image: urlImg,
        isCorrectAnswer: true
    })

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

questions.push(objetopergunta)


    }
    
    console.log(questions)

  }


comeco()
criarPerguntas()

