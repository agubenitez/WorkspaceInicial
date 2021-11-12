const VALOR_DOLAR  = 40
var currentCart =[];
var currentSubTotal = 0
var subTotales = []
var total = 0;
var subtotalTotal = 0


var moneda = "UYU";

function btnPagar(e) {
  let defRadio = document.getElementById("defRadio");
  let calleEnvio = document.getElementById("calleEnvio");
  let numeroEnvio = document.getElementById("numeroEnvio");
  let btnPagar = document.getElementById("btnPagar");
  var cantidades = document.getElementsByClassName("inputsCant")
  for (let i = 0; i < cantidades.length; i++) {
    let cant = cantidades[i]
    if (cant.value == 0) {
      e.stopPropagation()
      alert("indique una cantidad mayor a 0 en los productos seleccionados")
    }
  }
  if (!defRadio.checked) {
    if (calleEnvio.value.length == 0 || numeroEnvio.value.length == 0) {
      e.stopPropagation()
      alert("indique una direccion de envio")
    }
  }
}

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
  <input class="inputsCant" id="`+i+`" onInput="subtotal(`+i+`,`+cost+`)" type="number" placeholder="1" step="1" min="0" max="99" value=`+CartProduct.count+`>
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

 //TOTAL POR DEFECTO
  var totalDiv = document.getElementById("totalDiv")
  totalDiv.innerHTML = `<strong>
TOTAL: `+moneda+` `+subtotalTotal+`
</strong>   `

document.getElementById("defRadio").checked = true;
document.getElementById("dirEnvio").style.display="none"

}
function costoEnvio(envio){
  var totalDiv = document.getElementById("totalDiv")
  var  miTotal = 0
  var costoEnvio = 0
//mostrar direccion de envio
 
  document.getElementById("dirEnvio").style.display="flex"
 
  if (envio == 0){
    document.getElementById("dirEnvio").style.display="none"
    miTotal = subtotalTotal
    }
if (envio == 1){
costoEnvio = (subtotalTotal * 0.15)
miTotal = subtotalTotal + costoEnvio

}
if (envio == 2){
  costoEnvio =  (subtotalTotal * 0.07)
  miTotal = subtotalTotal + costoEnvio
  }
  if (envio == 3){
    costoEnvio =  (subtotalTotal * 0.05)
    miTotal = subtotalTotal + costoEnvio
    }
totalDiv.innerHTML = `<strong>
SUBTOTAL: `+moneda+` `+subtotalTotal+`
<br>
ENVIO: `+moneda+` `+costoEnvio+`
<br>
TOTAL: `+moneda+` `+miTotal+`

</strong>   `
//scrollear la pagina hasta la direccion de envio
location.href = "#dirEnvio"
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

function payBank(){
  let paymentDiv = document.getElementById("payment")
  paymentDiv.innerHTML = ``
  paymentDiv.innerHTML = ` <div class="row mt-3">
  <form>
    <div class="form-row">
    <div class="form-group "> <label for="Select Your Bank">
    <h6>Select your Bank</h6>
</label> <select class="form-control" id="selectBank" required>
    <option value="" selected disabled>--Please select your Bank--</option>
    <option>Banco Itaú Uruguay</option>
    <option>Banco Santander</option>
    <option>Banque Heritage.</option>
    <option>BBVA</option>
    <option>Citibank</option>
    <option>HSBC Bank</option>
    <option>Scotiabank Uruguay</option>
 
</select> </div>
    </div>

    <div class="form-row">
    <div class="form-group col-md-8">
      <label for="inputTitular">Numero de cuenta</label>
      <input type="text" class="form-control" id="inputTitular" required>
    </div>
    <button  type="submit" onclick="confirmarPagoBank()" class="btn btn-primary">CONFIRMAR PAGO</button>
  </form>
</div>`
}

function payCredit(){
  let paymentDiv = document.getElementById("payment")
  paymentDiv.innerHTML = ``
    paymentDiv.innerHTML = ` <div class="row mt-3">
  <form>
    <div class="form-row">
      <div class="form-group col-md-8">
        <label for="inputTitular">Nombre del titular</label>
        <input type="text" class="form-control" id="inputTitular" required>
      </div>
      <div class="form-group col-md-4">
        <label for="inputCVV">CVV</label>
        <input type="text" class="form-control" id="inputCVV" required>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-12 ">
        <label for="inputCardNumber">Numero tarjeta</label>
        <input type="text" class="form-control" id="inputCardNumber" required>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label>Fecha de vencimiento</label>
        <div class="input-group">
          <input type="number" placeholder="MM" name="" class="form-control" id="vencimientoM" required>
          <input type="number" placeholder="YY" name="" class="form-control" id="vencimientoY" required>
        </div>
      </div>
    </div>
    <button  type="submit" onclick="confirmarPago()" class="btn btn-primary">CONFIRMAR PAGO</button>
  </form>
</div>`
}

function confirmarPago(){

  let exampleModal = document.getElementById("exampleModal")
  let inputTitular = document.getElementById("inputTitular").value
  let inputCVV = document.getElementById("inputCVV").value
  let inputCardNumber = document.getElementById("inputCardNumber").value
  let vencimientoM = document.getElementById("vencimientoM").value
  let vencimientoY = document.getElementById("vencimientoY").value
  if(inputTitular.length != 0 && inputCVV.length != 0 && inputCardNumber.length != 0 && vencimientoM.length != 0 && vencimientoY.length != 0 ){
  exampleModal.innerHTML =
  `<div class="alert alert-success" role="alert">
  <h4 class="alert-heading">PAGO ACEPTADO</h4>
  <p>Su pago se completo con exito</p>
  <hr>
  <p class="mb-0">Gracias por su compra </p>
</div>`
  }


}

function confirmarPagoBank(){
  let exampleModal = document.getElementById("exampleModal")
  let selectBank = document.getElementById("selectBank").value
  let inputTitular = document.getElementById("inputTitular").value
 if(selectBank != "" && inputTitular.length != 0){

  exampleModal.innerHTML =
  `<div class="alert alert-success" role="alert">
  <h4 class="alert-heading">PAGO ACEPTADO</h4>
  <p>Su pago se completo con exito</p>
  <hr>
  <p class="mb-0">Gracias por su compra </p>
</div>`
  }

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

    document.getElementById("btnPagar").addEventListener('click', btnPagar); 

});