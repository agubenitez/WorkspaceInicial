//Producto
var carouselImages = document.getElementById("carousel-images")
var description = document.getElementById("description")
var cost = document.getElementById("cost")
var parrafoCategory = document.getElementById("parrafoCategory")
var parrafoVendidos = document.getElementById("parrafoVendidos")
var tituloName = document.getElementById("tituloName")
var cardGroup = document.getElementById("cardGroup")
var products = [];
var currentProductInfo=[];


//Comentarios
var rowComentarios = document.getElementById("rowComentarios")
var radio5 = document.getElementById("radio5")
var buttonEnviar = document.getElementById("buttonEnviar")
var currentComments = [];


//Funcion para mostrar en el html la informacion del producto
//el producto se pasa por parametro
//el producto es un objeto de tipo JSON
function showProductInfo() {
  //CREACION DEL CAROUSEL DE IMAGENES
    //las imagenes del producto estan guardadas en un array
    images = currentProductInfo.images
    //descompongo el array con un for para obtener las imagenes individuales
    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      //a continuacion cargo cada imagen en un div.carousel-item
      //if- es la imagen en la posicion 0 (LA PRIMERA EN EL ARRAY)
           //que aparezca como el item activo del carousel (class=active)
      //else- cargo el resto de las imagenes 
      if (i == 0) {
        carouselImages.innerHTML += `
              <div class="carousel-item active">
                <img src="`+ img + `" class="d-block w-100" alt="...">
              </div>
              `
      }else {
        carouselImages.innerHTML += `
              <div class="carousel-item">
                <img src="`+ img + `" class="d-block w-100" alt="...">
              </div>
             `
      }
    }
    //FIN CARROUSEL

    //PRODUCTOS RELACIONADOS
    
      

    //Desgloso el resto de la informacion del producto en el HTML en los lugares que ya tienen reservados
    tituloName.innerHTML = `<h1  style="font-weight:800">` + currentProductInfo.name + `</h1>`
    cost.innerHTML = `<p>` + currentProductInfo.currency + +currentProductInfo.cost + `</p>`
    description.innerHTML = `<p>` + currentProductInfo.description + `</p>`
    parrafoCategory.innerHTML = `Categoria: <a href="category-info.html">` + currentProductInfo.category + `</a>`
    parrafoVendidos.innerHTML = `Vendidos: ` + currentProductInfo.soldCount + ``

  }

  function showRelateds(){
    
    relateds = currentProductInfo.relatedProducts;

    for (let i = 0; i < relateds.length; i++) {
      let related = relateds[i];
        cardGroup.innerHTML += `
        <div class="card">
        <a class="badge badge-secondary" href="">
        <img src="`+products[related].imgSrc+`" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">`+products[related].name+`</h5>
          <p class="card-text">`+products[related].description+`</p>
          <p class="card-text">`+products[related].currency+``+products[related].cost+`</p>
         </div>
      </a>
     </div>
     

              `
    }
  }


//COMENTARIOS
  //esta funcion muestra los comentarios que estan en el JSON PRODUCT_INFO_COMMENTS_URL
function showComments(commentsInfo) {
  //recorro la lista de comentarios
  for (let i = 0; i < commentsInfo.length; i++) {
    //cada comentario es un objeto
    let comment = commentsInfo[i];
    //por cada comentario hago una columna de 8 lugares para la informacion del comentario
    //y una columna de 4 para las puntuaciones en estrellas
      //cada comentario se despliega como un item de una lista
    rowComentarios.innerHTML += `
        <div class="col-8">
        <div class="list-group">
          <a  class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">`+ comment.user + `</h5>
              <small>`+ comment.dateTime + `</small>
            </div>
            <p class="mb-1">`+ comment.description + `</p>
            </a>
        </div>
      </div>
     `;
    //Dependiendo el score del comentario,
    //se van a mostrar la columna que corresponde a esa cantidad de estrellas
    if (comment.score == "1") {
      rowComentarios.innerHTML +=
        `
      <div class="col-4">
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star "></span>
      <span class="fa fa-star "></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      </div>
      `}
    if (comment.score == "2") {
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
    if (comment.score == "3") {
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
    if (comment.score == "4") {
      rowComentarios.innerHTML +=
        `
        <div class="col-4">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        </div>
        `
    }
    if (comment.score == "5") {
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

//Funcion para crear un nuevo comentario
  //a la funcion se le pasa por parametro el texto del comentario y el usario que comento
function newComment(textComment, user) {
  //obtengo la fecha de hoy
  let date = new Date();
  //agrego el nuevo comentario abajo del ultimo comentario en la row
   //AL MES (date.getMonth()) LE SUMO 1 PARA OBTENER EL MES ACTUAL YA QUE POR DEFECTO TRAE UN MES ATRASADO
  rowComentarios.innerHTML += `
        <div class="col-8">
        <div class="list-group">
          <a  class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">`+ user + `</h5>
              <small>`+ date.getDate() + `-` + (parseInt(date.getMonth())+1)  + `-` + date.getFullYear() + ` ` + date.getHours() + `:` + date.getMinutes() + `:` + date.getSeconds() + `</small>
            </div>
            <p class="mb-1">`+ textComment + `</p>
            </a>
        </div>
      </div>      
    `;
  //PUNTAJE  
    //cada radio button corresponde a un puntaje, 
    //dependiendo el puntaje(radio) que este checkeado
    //cargo la cantidad de estrellas correspondientes en el nuevo comentario
    if (radio5.checked == true) {
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
  if (radio4.checked == true) {
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
  if (radio3.checked == true) {
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
  if (radio2.checked == true) {
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
  if (radio1.checked == true) {
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
}

//funcion que se ejecuta al cargar la pagina
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") { 
      currentProductInfo=resultObj.data
      showProductInfo();
    }
  });
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") { 
      products = resultObj.data
      showRelateds();

    }
  });
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentComments = resultObj.data
      showComments(resultObj.data);
    }
  });
  document.getElementById("buttonEnviar").addEventListener("click", function () {
    //Obtengo el usuario del localStorage
    let user = localStorage.getItem("user")
    //Obtengo el contenido del textarea que corresponde al comentario
    var textComment = document.getElementById("textComment").value
    //ejecuto la funcion que carga un nuevo comentario abajo del ultimo
    newComment(textComment, user)
  });
});