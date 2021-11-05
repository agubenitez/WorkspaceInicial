const VALOR_DOLAR  = 40
var currentCart =[];
var currentSubTotal = 0
var subTotales = []
var total = 0;
var subtotalTotal = 0

var moneda = "UYU";

//fUNCION QUE MUESTRA LA LISTA DE ARTICULOS DEL CARRITO
function showCart(){   
    //ELEMENTO list DEL HTML DONDE SE CARGAN LOS ARTICULOS
    var cartListId = document.getElementById("cartListId")
    //DECLARO UNA VARIABLE articles QUE CONTIENE LOS ARTICULOS DEL CARRITO
   var articles =  currentCart.articles
   //recorro los articulos
   for (let i = 0; i <articles.length; i++) {
     //declaro una variable CartProduct que corresponde al articulo del carrito por el que esta pasando el for
   let CartProduct = articles[i];
  //convierto el costo del articulo para que corresponda a la moneda indicada por la variable "moneda" declarada al principio
  cost = convertir(CartProduct.unitCost, CartProduct.currency)
  //cargo el contenido html de cada articulo en la lista
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

    //en el input que corresponde a la cantidad de articulos, creo un evento onInput
    //con el cual al cambiar la cantidad se ejecuta la funcion "subtotal(i,costo)" que va a calcular el subtotal
    //le doy un id unico a cada input para poder calcular el subtotal de cada articulo individualmente
    //le doy id unico a la etiqueta strong donde se encuenta el subtotal, para de esta forma poder cambiar el contenido del subtotal de cada articulo
    //la funcion subtotal se va a encargar de cambiar el contendio de la etiqueta strong que contiene el subtotal
  //para obtener el subtotal  multiplico la cantidad por el costo unitario
 //guardo cada subtotal en un array con la posicion del index del for para luego poder hacer la suma total
 subTotales[i] = CartProduct.count*cost

 }
 //ejecuto la funcion sumarTotal calcula la suma de todos los subtotales
 sumarTotal()
}

//FUNCION QUE CALCULA EL SUBTOTAL
  //la funcion recibe como parametro "i" que corresponde al index del for en showCart() y el costo,
  //la i me proporciona una id unica para cada articulo y de esta forma puedo puedo acceder a su informacion de manera
  function subtotal(i,cost){
    //declaro la variable count, que corresponde al valor del input que determina la "cantidad" que se muestra en el html
    count = document.getElementById(i).value
    //declaro una variable que contiene el subtotal
    currentSubTotal = count*cost
    // declaro una variable que corresponde a la etiqueta strong donde se encuentra el subtotal
    sub = document.getElementById(i+"Sub")
    //cambio el contenido de la etiqueta strong por el nuevo subtotal
    sub.innerHTML =`  
    Subtotal: `+moneda+` `+currentSubTotal+`
    `
    //cambio el valor del subtotal en la posicion donde se encontraba el anterior
    subTotales[i]=currentSubTotal
   //ejecuto la funcion que suma el total, para obtener el nuevo total con el nuevo subtotal
    sumarTotal();
}

//FUNCION QUE SUMA LOS SUBTOTALES Y MUESTRA EL TOTAL EN EL HTML
function sumarTotal(){
  //declaro una variable que contiene el div previamente preparado en el html para contener el total
  var subtotalDiv = document.getElementById("subTotalDiv")
  //inicializo el total en 0
  var total = 0
  //recorro el array donde tengo los subtotales
  total = subTotales.reduce(getSum);
  function getSum (total2,num){
    return total2 + num;
  }


  subtotalTotal = total

  // for (let i = 0; i <subTotales.length; i++) {
     //agrego y sumo cada subtotal al total
 //  total += subTotales[i]
   
  // }
  //muestro el total en el html
  subtotalDiv.innerHTML = `<strong style="float:right">
  SUBTOTAL: `+moneda+` `+total+`
  </strong>   `
  var totalDiv = document.getElementById("totalDiv")
  totalDiv.innerHTML = `<strong style="float:right">
TOTAL: `+moneda+` `+subtotalTotal+`
</strong>   `
document.getElementById("defRadio").checked = true;

}
function costoEnvio(envio){
  var totalDiv = document.getElementById("totalDiv")
  var  miTotal = 0
  if (envio == 0){
    
    miTotal = subtotalTotal
    }
if (envio == 1){
   
miTotal = subtotalTotal + (subtotalTotal * 0.15)
}
if (envio == 2){
 
  miTotal = subtotalTotal + (subtotalTotal * 0.07)
  }
  if (envio == 3){
    
    miTotal = subtotalTotal + (subtotalTotal * 0.05)
    }
totalDiv.innerHTML = `<strong style="float:right">
TOTAL: `+moneda+` `+miTotal+`
</strong>   `
}

//FUNCIONES PARA CAMBIAR DE MONEDA, CADA UNA CORRESPONDE A UN BOTON PREVIAMENTE CREADO EN EL HTML
    
function pasarDolar(){
  //limpio el contenido de la lista
  var cartListId = document.getElementById("cartListId")
  cartListId.innerHTML = ""
  //cambio el valor de la moneda
  moneda = "USD"
  //vuelvo a cargar la lista
  showCart();

}
function pasarPeso(){
  var cartListId = document.getElementById("cartListId")
  cartListId.innerHTML = ""
  moneda = "UYU"
  showCart();

}

//FUNCION QUE CONVIERTE EL COSTO A LA MONEDA INDICADA EN LA VARIABLE moneda
// se pasa por parametro el costo y el currency actual y
//devuelve el costo convertido a la moneda indicada en la variable "moneda"
function convertir(costo, currency){
    if (moneda == "UYU" && currency == "USD"){
    costo = costo*VALOR_DOLAR
    }
    if (moneda == "USD" && currency == "UYU"){
      costo = costo/VALOR_DOLAR
    }
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