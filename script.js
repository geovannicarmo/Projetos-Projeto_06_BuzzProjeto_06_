function infQuizz(){
    let titulo=document.querySelector("#titulo")
    
    let url=document.querySelector("#url")
    
    let nperguntas=document.querySelector("#nperguntas")
    
    let nniveis=document.querySelector("#nniveis")
    

    console.log(titulo.value.length)

    if(titulo.value.length<20 || titulo.value.length>65 || nperguntas.value<3 || isNaN(nperguntas.value) ||nniveis.value<2 || isNaN(nniveis.value)){
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
comeco()

