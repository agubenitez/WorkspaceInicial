var currentCart =[];
const VALOR_DOLAR  = 44

  function showCart(){     
     var cartListId = document.getElementById("cartListId")
     var totalDiv = document.getElementById("totalDiv")
     var articles =  currentCart.articles
     var total = 0;
    for (let i = 0; i <articles.length; i++) {
      let CartProduct = articles[i];

      //CONVERSIONES 
      cant = cartProduct.cant
      cost = CartProduct.unitCost
      if(CartProduct.currency=="USD"){
          cost = cost*VALOR_DOLAR
      }

      subTotal = cost*(CartProduct.count)
      total += subTotal
      cartListId.innerHTML += `
      <li class="cartList">
      <!-- IMAGEN -->
      <img class="cartListImg" src="`+CartProduct.src+`">
      <!-- TITULO -->
      <div>
        <strong> 
          <a href="">
          `+CartProduct.name+`
          </a>
        </strong>
      </div>
      <!-- INFORMACION DEL PRODUCTO -->
    <div style="float:left;">
    `+CartProduct.currency+``+CartProduct.unitCost+`
     <br>
     Cantidad:
     <input type="number" placeholder="1" step="1" min="0" max="99" value=`+CartProduct.count+`>
     <br>
     <strong>
      Subtotal: UYU`+subTotal+`
     </strong>
    </div>
    </li>     
 
        `
    }
totalDiv.innerHTML = `<strong style="float:right">
TOTAL: UYU `+total+`
</strong>   `

  }



document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(CART_INFO_URL_2).then(function (resultObj) {
        if (resultObj.status === "ok") {
          currentCart = resultObj.data;
          showCart();
        }
      });

});