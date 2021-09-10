//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//<div id="carousel-images" class="carousel-inner">

var carouselImages = document.getElementById("carousel-images")
var description = document.getElementById("description")
var cost = document.getElementById("cost")
var parrafoCategory = document.getElementById("parrafoCategory")
var parrafoVendidos = document.getElementById("parrafoVendidos")
var tituloName = document.getElementById("tituloName")
//Comentarios
var rowComentarios = document.getElementById("rowComentarios")
var radio5 = document.getElementById("radio5")
var buttonEnviar = document.getElementById("buttonEnviar")

var currentComments = [];


function showComments(commentsInfo){

    for (let i = 0; i < commentsInfo.length; i++) {
        let comment = commentsInfo[i];
    
        rowComentarios.innerHTML += `

        <div class="col-8">
        <div class="list-group">
          <a  class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">`+comment.user+`</h5>
              <small>`+comment.dateTime+`</small>
            </div>
            <p class="mb-1">`+comment.description+`</p>
            </a>
        </div>
      </div>
      
    `; if(comment.score == "1"){
        rowComentarios.innerHTML += 
        `
      <div class="col-4">
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star "></span>
      <span class="fa fa-star  "></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      </div>
      `}
      if(comment.score == "2"){
        rowComentarios.innerHTML += 
        `
        <div class="col-4">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star  "></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        </div>
        `

      }
      if(comment.score == "3"){
        rowComentarios.innerHTML += 
        `
        <div class="col-4">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked "></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        </div>
        `

      }
      if(comment.score == "4"){
        rowComentarios.innerHTML += 
        `
        <div class="col-4">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star  checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        </div>
        `

      }
      if(comment.score == "5"){
        rowComentarios.innerHTML += 
        `
        <div class="col-4">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked "></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        </div>
        `

      }
      `
        `

}
}



function showProductInfo(currentProduct){
    images = currentProduct.images
  for (let i = 0; i < images.length; i++) {
       let img = images[i];

      if (i ==0){
carouselImages.innerHTML += `
            <div class="carousel-item active">
              <img src="`+img+`" class="d-block w-100" alt="...">
            </div>
            `
}else{
    carouselImages.innerHTML += `
            <div class="carousel-item">
              <img src="`+img+`" class="d-block w-100" alt="...">
            </div>
            `

}
tituloName.innerHTML = `<h1  style="font-weight:800">`+currentProduct.name+`</h1>`
cost.innerHTML = `<p>`+currentProduct.currency+ +currentProduct.cost+`</p>`
description.innerHTML = `<p>`+currentProduct.description+`</p>`
parrafoCategory.innerHTML=`Categoria: <a href="category-info.html">`+currentProduct.category+`</a>`
parrafoVendidos.innerHTML=`Vendidos: `+currentProduct.soldCount+``
    
  }
}



document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
       
        if (resultObj.status === "ok") {
        
          showProductInfo(resultObj.data);
        }
      });
      getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
       
        if (resultObj.status === "ok") {
            currentComments = resultObj.data
          showComments(resultObj.data);
        }
      });
      document.getElementById("buttonEnviar").addEventListener("click", function(){
          
        if(radio5.checked == true){console.log("1 ESTRELLA")}
        if(radio4.checked == true){console.log("2 ESTRELLA")}

        if(radio3.checked == true){console.log("3 ESTRELLA")}

        if(radio2.checked == true){console.log("4 ESTRELLA")}
        if(radio1.checked == true){console.log("5 ESTRELLA")}



    });
});