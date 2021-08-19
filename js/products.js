//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.



function showProductsList(productsArray){

    let htmlContentToAppend = "";
    for(let i = 0; i < productsArray.length; i++){
        let products = productsArray[i];

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

        document.getElementById("container-products-list").innerHTML = htmlContentToAppend;
    }
   
    document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(PRODUCTS_URL).then(function(resultObj){
         if (resultObj.status === "ok"){
            showProductsList( resultObj.data);
        }
    });
     
    });

