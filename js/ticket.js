const tbody = document.getElementById("tbody");
const dire = document.getElementById("dire");
const trTotal = document.getElementById("total")
var currentTicket = [];
var registro = []
var cant=1;
var burguers = [
    {
        "name": "Ant-Man",
        "id": "a",
        "description": "",
        "cost": 245,
        "costInterface": 245,
        "currency": "$"
       
       
    },
    {
        "name": "Hukl",
        "id": "h",
        "description": "",
        "cost": 355,
        "costInterface": 355,
        "currency": "$"
    },
    {
        "name": "Capitan America",
        "id": "c",
        "description": "",
        "cost": 315,
        "costInterface": 315,
        "currency": "$"
    },
    {
        "name": "Iron Man",
        "id": "i",
        "description": "",
        "cost": 375,
        "costInterface": 375,
        "currency": "$"
    },
    {
        "name": "4 Fantastic",
        "id": "4",
        "description": "",
        "cost": 365,
        "costInterface": 365,
        "currency": "$"
    },
    {
        "name": "Marvel",
        "id": "m",
        "description": "",
        "cost": 525,
        "costInterface": 525,
        "currency": "$"
    },
    {
        "name": "Aros",
        "id": "ar",
        "description": "",
        "cost": 50,
        "costInterface": 50,
        "currency": "$"
    },
    {
        "name": "Bravas",
        "id": "br",
        "description": "",
        "cost": 50,
        "costInterface": 50,
        "currency": "$"
    },
    {
        "name": "15% de descuento!!!",
        "id": "descuento",
        "description": "",
        "cost": 0,
        "costInterface": "- 15% !!! ",
        "currency": "$"
    },
    
]

function imprimir() {
    
    showTicket()
    window.print();
}


    

function showTicket(){
  
let htmlContentToAppend = "";
for (let i = 0; i < currentTicket.length; i++) {
    let ticket = currentTicket[i]; 
htmlContentToAppend +=
`
    <tr>
    <td class="cantidad">`+ cant + `</td>
    <td class="producto">`+ticket.name+`   <br> `+ticket.burguer.notas+`  </td>

    <td class="precio">`+ticket.burguer.currency+ticket.burguer.cost+`</td>
    </tr>

`
}

tbody.innerHTML = htmlContentToAppend;
total = sumarTotal(currentTicket)

trTotal.innerHTML = `                    
<td></td>
<td>TOTAL</td>
<td id="total">$`+total+`</td>`

}
//fin show ticket




function agregarProd(id, notas) {
    if(notas==undefined){
    notas=""
    }
    console.log(notas)

let htmlContentToAppend = "";
var precioTotal;

for (let i = 0; i < burguers.length; i++) {
    let burguer = burguers[i]; 

    if(burguer.id === id){ 
   
         currentTicket.push({notas,burguer})
               console.log(currentTicket)

htmlContentToAppend += 
`
    <tr>
    <td class="cantidad">`+ cant + `</td>
    <td class="producto">`+burguer.name+`   <br> `+notas+`  </td>

    <td class="precio">`+burguer.currency+burguer.cost+`</td>
    </tr>

`

}


}
tbody.innerHTML += htmlContentToAppend;
total = sumarTotal(currentTicket)

trTotal.innerHTML = `                    
<td></td>
<td>TOTAL</td>
<td id="total">$`+total+`</td>`

}
//fin agregar prod

function sumarTotal(array){
var total=0
    for (let i = 0; i < array.length; i++) {
        var a = array[i]
        var costo = parseInt(a.burguer.cost)
        total = total + costo

        if(a.id == "descuento"){
            total -= a.cost
            total = Math.round(total * 0.85)
        }
    }
    return (total);
    
}



function cofirmar(){
    for (let i = 0; i < currentTicket.length; i++) {
        let tick = currentTicket[i];
        costo = tick.cost
        console.log(costo)
    
        precioTotal+=costo
        console.log(precioTotal)
    
    }
    
    console.log(currentTicket)
    htmlContentToAppend += 
    `
        <tr>
        <td class="total">`+ precioTotal + `</td>
        </tr>
    `
}


document.addEventListener("DOMContentLoaded", function(e){

    document.getElementById("agregar").addEventListener("click", function () {
        idProd= document.getElementById("idProd").value
        inputNotas = document.getElementById("inputNotas").value
        if(inputNotas==undefined){
            inputNotas=""
            }
        agregarProd(idProd,inputNotas)
      
 
      });

      document.getElementById("nuevo").addEventListener("click", function () {
       // currentTicket=[]
        tbody.innerHTML = ""
        trTotal.innerHTML = ""
        showTicket()
  
      });

      document.getElementById("botonDir").addEventListener("click", function () {
        document.getElementById("parrafoDir").innerHTML = '';
        var dire = document.getElementById("parrafoDir");
        var direccion = document.createTextNode(document.getElementById("inputDir").value)
        dire.appendChild(direccion)
        
      });
      document.getElementById("botonNombre").addEventListener("click", function () {
        document.getElementById("parrafoNombre").innerHTML = '';
        var parrafo = document.getElementById("parrafoNombre");
        var contenido = document.createTextNode(document.getElementById("inputNombre").value)
        parrafo.appendChild(contenido)
        console.log(contenido)
        
      });
      document.getElementById("botonTelefono").addEventListener("click", function () {
        document.getElementById("parrafoTelefono").innerHTML = '';
        var dire = document.getElementById("parrafoTelefono");
        var direccion = document.createTextNode(document.getElementById("inputTelefono").value)
        dire.appendChild(direccion)
        
      });
   

});
