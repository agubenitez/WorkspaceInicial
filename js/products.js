//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//variables que van a definir el orden de la lista
const ORDER_ASC_BY_PRICE = "ASC";
const ORDER_DESC_BY_PRICE = "DESC";
const ORDER_DESC_BY_SOLDCOUNT = "SOLDCOUNT";
var minPrecio = undefined;
var maxPrecio = undefined;

//en esta variable se va a guardar la lista de productos que se esta mostrando en pantalla
var currentProducts = [];
//en esta variable se va a guardar el orden en el que se esta mostrando la lista en pantalla
var currentSortCriteria = undefined;

//FUNCION PARA ORDENAR LISTA DE PRODUCTOS
function sortProducts(criteria, array) {
  let result = [];
  //dependiendo el criterio de orden que se pase por parametro,
  //haciendo uso de "sort", 
  //se ordena la lista pasada por parametro, con el criterio correspondiente

  //ORDEN ASCENDIENTE POR PRECIO
  if (criteria === ORDER_ASC_BY_PRICE) {
    result = array.sort(function (a, b) {
      if (parseInt(a.cost) < parseInt(b.cost)) { return -1; }
      if (parseInt(a.cost) > parseInt(b.cost)) { return 1; }
      return 0;
    });
   //ORDEN DESCENDIENTE POR PRECIO
  } else if (criteria === ORDER_DESC_BY_PRICE) {
    result = array.sort(function (a, b) {
      if (parseInt(a.cost) > parseInt(b.cost)) { return -1; }
      if (parseInt(a.cost) < b.name) { return 1; }
      return 0;
    });
   //ORDEN DESCENDIENTE POR RELEVANCIA
  } else if (criteria === ORDER_DESC_BY_SOLDCOUNT) {
    result = array.sort(function (a, b) {
      if (parseInt(a.soldCount) > parseInt(b.soldCount)) { return -1; }
      if (parseInt(a.soldCount) < parseInt(b.soldCount)) { return 1; }
      return 0;
    });
  }
  return result;
}

//FUNCION QUE MUESTRA LA LISTA DE PRODUCTOS
  //crea una lista a partir de un objetos tipo JSON
  //cada objeto de la lista es un producto
  //cada producto tiene imagen, nombre, cantidad de vendidos, descripcion, moneda y costo
function showProductsList() {
  //variable que va a contener el codigo html con la lista de productos
  let htmlContentToAppend = "";
  //FOR QUE RECORRE LA LISTA
    //la lista que se recorre es currentProducts, que corresponde a la lista que se guardo
    //al ejecutarse la funcion sortAndShowProducts
    //siempre que se cargue la pagina por primera vez se va a ejecutar sortAndShowProducts
    //esta funcion va currentProducts
    //por lo tanto no es necesario hacer ninguna validacion a currentProducts 
    //asi como tampoco pasarle a showProductsList algun parametro
    
  for (let i = 0; i < currentProducts.length; i++) {
    // variable que corresponde al objeto (el producto) de la lista por el que esta pasando el for
    let products = currentProducts[i];



    //este if aplica los filtros a la lista
    //si el precio del producto no esta en el rango de minPrecio y maxPrecio este no se agrega a la lista
    //y el for continua pasando al siguiente producto
  
    if (((minPrecio == undefined) || (minPrecio != undefined && parseInt(products.cost) >= minPrecio)) &&
    ((maxPrecio == undefined) || (maxPrecio != undefined && parseInt(products.cost) <= maxPrecio))){
    
      //se agrega a la variable htmlContentToAppend el codigo HTML
    //este codigo contiene los datos del producto desglosados en una lista
    htmlContentToAppend += `
    <div class="col-md-4">
      <div class="card mb-4 shadow-sm">
        <a href="product-info.html">   <img class="img-fluid" src="` + products.imgSrc + `" alt=""> </a>
        <div class="card-body">
          <h5 class="card-title">`+ products.name +`</h5>  
        
          <p class="card-text">` + products.description + `</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
            <a href="product-info.html">  <button type="button" class="btn btn-sm btn-outline-secondary">View</button></a>
            <small class="mt-2 ml-1" >` + products.soldCount + `  Vendidos</small>
             </div>
              
                <p class="mt-3" > ` + products.currency + ` ` + products.cost + `</p>
          </div>
      </div>
    </div>
     </div>
           
           `
  }
}
  //mediante el metodo innerHTML
  //agrego en el documento HTML el contenido de la variable htmlContentToAppend
  //este contenido va dentro del contenedor que ya esta preparado para eso en el HTML
  document.getElementById("container-products-list").innerHTML = htmlContentToAppend;
}


// funcion para ordenar y mostrar lista de productos
function sortAndShowProducts(sortCriteria, productsArray) {
  currentSortCriteria = sortCriteria;
  // si se pasa por parametro una lista, 
    //esta se guarda en currentProduct
    
  if (productsArray != undefined) {
    currentProducts = productsArray;
  }
  //ordeno la lista guardada en currentProducts
  currentProducts = sortProducts(currentSortCriteria, currentProducts);

  showProductsList();
}

//el evento DOMContentLoaded, se ejecuta cuando se carga la pagina
document.addEventListener("DOMContentLoaded", function (e) {
  //le psao a la funcion getJSONData la URL con la lista de productos 
  // la funcion genera un objeto de tipo JSON
  //el objeto JSON se guarda en resultObj
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    //si los datos se cargaron correctamente
    //ejecuto la funcion showProductsList y le paso como parametro el objeto JSON
    //el objeto contiene la lista de productos
    if (resultObj.status === "ok") {
      sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data);
    }
  });
  //ejecuto un evento cada vez que se hace click en el elemento option que 
  //contiene las opciones de orden
  document.getElementById("formOrdenarProductos").addEventListener("click", function () {
    //creo una variable que contiene el elemento option con las opciones posibles
    var formOrdenProd = document.getElementById("formOrdenarProductos")
    //creo una variable que contiene el valor de cada select definido en el html
    //uso esta variable para apuntar a la opcion que selecciona el usuario
    var valorActual = formOrdenProd.value
    //dependiendo la opcion que seleccione el usuario 
    //ejecuto la funcion correspondiente para ordenar la lista
    if (valorActual == 1) {
      //este if es para que no se cargue la lista cada vez que se hace click en el boton para ordenar
     
      //el orden seleccionado tiene que ser distinto al que ya se esta mostrando en pantalla
      //para que se ejecute la funcion
           if(currentSortCriteria!=ORDER_ASC_BY_PRICE){
       sortAndShowProducts(ORDER_ASC_BY_PRICE, currentProducts)
      }
    }
    if (valorActual == 2) {
      if(currentSortCriteria!=ORDER_DESC_BY_PRICE){
        sortAndShowProducts(ORDER_DESC_BY_PRICE, currentProducts)
       }
    }
    if (valorActual == 3) {
      if(currentSortCriteria!=ORDER_DESC_BY_SOLDCOUNT){
        sortAndShowProducts(ORDER_DESC_BY_SOLDCOUNT, currentProducts)
       }   
    }
  });

  //al hacer click en el boton filtrar se guardan los valores de los input de min y max 
  //estos valores se guardan en las variables minPrecio maxPrecio para luego usarse en la funcion showProductsList
  document.getElementById("botonFiltroPrecio").addEventListener("click", function(){
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minPrecio = document.getElementById("precioMin").value;
    maxPrecio = document.getElementById("precioMax").value;
  
    if ((minPrecio != undefined) && (minPrecio != "") && (parseInt(minPrecio)) >= 0){
      minPrecio = parseInt(minPrecio);
    }
    else{
      minPrecio = undefined;
    }
  
    if ((maxPrecio != undefined) && (maxPrecio != "") && (parseInt(maxPrecio)) >= 0){
      maxPrecio = parseInt(maxPrecio);
    }
    else{
      maxPrecio = undefined;
    }
  
    showProductsList();
  });
//Este evento apunta al boton limpiar
//al hacer click en limpiar se quitan los valores de minPrecio y maxPrecio
//se limpian los input
//se vuelve a mostrar la lista completa
  document.getElementById("limpiarFiltros").addEventListener("click", function(){
    document.getElementById("precioMin").value = "";
    document.getElementById("precioMax").value = "";

    minPrecio = undefined;
    maxPrecio = undefined;

    showProductsList();
});
  

});


// <a href="product-info.html" class="list-group-item list-group-item-action">
//                <div class="row">
//                <div class="col-3">
//                         <img src="` + products.imgSrc + `" class="img-thumbnail">
//                     </div>
//                    <div class="col">
//                        <div class="d-flex w-100 justify-content-between">
//                           <h4 class="mb-1">`+ products.name +`</h4>
//                          <small class="text-muted">` + products.soldCount + ` Vendidos</small>
//                        </div>
//                     <div class="d-flex w-100 justify-content-between">
//                       <p class="mb-1">` + products.description + `</p>
//                       <strong class="text-muted"> ` + products.currency + ` ` + products.cost + `</strong>
//                     </div>
//                    </div>
//                </div>
//            </a>