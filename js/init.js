const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const navBar = document.getElementById("nav")
var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function logOut(){
  localStorage.removeItem("user")
  window.location = "index.html"
}



//evento que se ejecuta al cargar la pagina
document.addEventListener("DOMContentLoaded", function(e){

 //obtengo el usuario logeado, que guarde previamente en localstore
let user = localStorage.getItem("user")

//cargo el contenido de la barra de navegacion en todas los html que contienen una
navBar.innerHTML += 

`<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>

<div class="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
  <ul class="navbar-nav">
    <li class="nav-item active">
      <a class="nav-link" href="index.html">Inicio <span class="sr-only">(current)</span></a>
    </li>
    <li class="nav-item active">
    <a class="nav-link" href="categories.html">Categorías<span class="sr-only">(current)</span></a>
  </li>
  <li class="nav-item active">
  <a class="nav-link" href="products.html">Productos <span class="sr-only">(current)</span></a>
</li>
<li class="nav-item active">
<a class="nav-link" href="sell.html">Vender <span class="sr-only">(current)</span></a>
</li>


    
    
  </ul>
 
</div>
<div class="mr-5 dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  `+user+`
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">Carrito</a>
    <a class="dropdown-item" href="#">Perfil</a>
    <a onclick="logOut()" class="dropdown-item" >Cerrar sesion</a>
  </div>
</div>

</nav>`
//<a class="mr-5 py-2 d-flex d-md-inline-block" href=""><img id="loguser"src="img/loguser.png" alt=""></a>
// `        
// <div class="container d-flex flex-column flex-md-row justify-content-between">
// <a class="py-2 d-none d-md-inline-block" href="index.html">Inicio</a>
// <a class="py-2 d-none d-md-inline-block" href="categories.html">Categorías</a>
// <a class="py-2 d-none d-md-inline-block" href="products.html">Productos</a>
// <a class="py-2 d-none d-md-inline-block" href="sell.html">Vender</a>
// <a class="py-2 d-none d-md-inline-block" href="cart.html">Mi carrito</a>

// <a class="py-2 d-none d-md-inline-block" href=""><img id="loguser"src="img/loguser.png" alt="">`+user+`</a>
// </div>
// `
});