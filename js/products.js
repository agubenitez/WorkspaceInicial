//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


//FUNCION QUE MUESTRA LA LISTA DE PRODUCTOS
//a esta funcion se le pasa como parametro una lista de objetos tipo JSON
//cada objeto de la lista es un producto
//cada producto tiene imagen, nombre, cantidad de vendidos, descripcion, moneda y costo
function showProductsList(productsArray){
    //variable que va a contener el codigo html con la lista de productos
    let htmlContentToAppend = "";
    //FOR QUE RECORRE LA LISTA
    for(let i = 0; i < productsArray.length; i++){
        // variable que corresponde al objeto (el producto) de la lista por el que esta pasando el for
        let products = productsArray[i];
        //se agrega a la variable htmlContentToAppend el codigo HTML
        //este codigo contiene los datos del producto desglosados en una lista
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

       //mediante el metodo innerHTML
       //agrego en el documento HTML el contenido de la variable htmlContentToAppend
       //este contenido va dentro del contenedor que ya esta preparado para eso en el HTML
       document.getElementById("container-products-list").innerHTML = htmlContentToAppend;
    }
      //el evento DOMContentLoaded, se ejecuta cuando se carga la pagina
    document.addEventListener("DOMContentLoaded", function(e){
                 //le psao a la funcion getJSONData la URL con la lista de productos 
                // la funcion genera un objeto de tipo JSON
               //el objeto JSON se guarda en resultObj
        getJSONData(PRODUCTS_URL).then(function(resultObj){
            //si los datos se cargaron correctamente
            //ejecuto la funcion showProductsList y le paso como parametro el objeto JSON
            //el objeto contiene la lista de productos
         if (resultObj.status === "ok"){
            showProductsList( resultObj.data);
        }
    });
     
    });

