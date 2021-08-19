//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


//Funcion que muestra la lista de productos
function showProductsList(productsArray){
    //Declaro la variable que va a contener el codigo html con la lista de productos
    let htmlContentToAppend = "";
    //Recorro el array que que contendra una lista de objetos en la que cada objeto corresponde a un producto.
    for(let i = 0; i < productsArray.length; i++){
        //declaro una variable que corresponde al item de la lista por el que esta pasando el for, esta correspondera a un producto
        let products = productsArray[i];
        //agrego a la variable que contiene el html los datos del producto 
           htmlContentToAppend +=`
           <a href="" class="list-group-item list-group-item-action">
               <div class="row">
               <div class="col-3">
                        <img src="` + products.imgSrc + `" class="img-thumbnail">
                    </div>
                   <div class="col">
                       <div class="d-flex w-100 justify-content-between">
                          <h4 class="mb-1">`+ products.name +`</h4>
                         <small class="text-muted">` + products.soldCount + ` Vendidos</small>
                       </div>
                    <div class="d-flex w-100 justify-content-between">
                      <p class="mb-1">` + products.description + `</p>
                      <strong class="text-muted"> ` + products.currency + ` ` + products.cost + `</strong>
                    </div>
                   </div>
               </div>
           </a>
           `
        }

       //mediante el metodo innerHTML agrego a mi HTML el contenido de la variable htmlContentToAppend que contiene la lista de productos generada en el for anterior
       document.getElementById("container-products-list").innerHTML = htmlContentToAppend;
    }
      //el evento DOMContentLoaded, se ejecuta cuando se carga la pagina
    document.addEventListener("DOMContentLoaded", function(e){
        //le psao a la funcion getJSONData que va a generar un objeto de tipo JSON la URL correspondiente a la lista productos
        //el objeto de tipo JSON se guarda en resultObj
        getJSONData(PRODUCTS_URL).then(function(resultObj){
            //si los datos se cargaron correctamente ejecuto la funcion showProductsList que va a mostrar la lista de productos
         if (resultObj.status === "ok"){
            showProductsList( resultObj.data);
        }
    });
     
    });

