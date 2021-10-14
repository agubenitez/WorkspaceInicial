var currentCart =[];
const VALOR_DOLAR  = 44
var currentSubTotal = 0
var subTotales = []
var total = 0;
var total1 = 0;
var moneda = "UYU";


function showCart(){     
  var cartListId = document.getElementById("cartListId")
   var articles =  currentCart.articles
   for (let i = 0; i <articles.length; i++) {
   let CartProduct = articles[i];

   //CONVERSIONES 
  //  costo = CartProduct.unitCost
  //  if(CartProduct.currency=="USD"){
  //      cost = cost*VALOR_DOLAR
  //  }

  cost = convertir(CartProduct.unitCost, CartProduct.currency)
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
  <input id="`+i+`" onInput="subtotal(`+i+`,`+cost+`)" type="number" placeholder="1" step="1" min="0" max="99" value=`+CartProduct.count+`>
  <br>
  <strong  id="`+i+`Sub" >
  Subtotal: `+moneda+` `+CartProduct.count*cost+` 
    </strong>
 </div>
 </li>     
     `

 subTotales[i] = CartProduct.count*cost


 }

 sumarTotal()
// totalDiv.innerHTML = `<strong style="float:right">
// TOTAL: UYU `+total+`
// </strong>   `

}

function subtotal(i,cost){
  count = document.getElementById(i).value
  currentSubTotal = count*cost

  sub = document.getElementById(i+"Sub")
  sub.innerHTML =`  
  Subtotal: `+moneda+` `+currentSubTotal+`
  `
  subTotales[i]=currentSubTotal
  console.log(subTotales)
  sumarTotal();
}

function sumarTotal(){
  var totalDiv = document.getElementById("totalDiv")
  var total = 0
  for (let i = 0; i <subTotales.length; i++) {
   total += subTotales[i]
   
  }
  totalDiv.innerHTML = `<strong style="float:right">
  TOTAL: `+moneda+` `+total+`
  </strong>   `
  
}
function convertir(costo, currency){
   if (moneda == "UYU" && currency == "USD"){
   costo = costo*40
 }
 if (moneda == "USD" && currency == "UYU"){
  costo = costo/40
}
//  else (moneda == "USD" && currency =="UYU")
//  {
//    costo = costo/40
//  }
 return costo
 }




document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(CART_INFO_URL_2).then(function (resultObj) {
        if (resultObj.status === "ok") {
          currentCart = resultObj.data;
          showCart();
        }
      });

});