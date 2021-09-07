const tbody = document.getElementById("tbody");
const dire = document.getElementById("dire");
var currentTicket = [];
var cant=1;
var burguers = [
    {
        "name": "Ant-Man",
        "id": "am",
        "description": "",
        "cost": 210,
        "currency": "$"
       
    },
    {
        "name": "Hukl",
        "id": "hk",
        "description": "",
        "cost": 300,
        "currency": "$"
    },
    {
        "name": "Capitan America",
        "id": "ca",
        "description": "",
        "cost": 270,
        "currency": "$"
    },
    {
        "name": "Iron Man",
        "id": "im",
        "description": "",
        "cost": 310,
        "currency": "$"
    },
    {
        "name": "4 Fantastic",
        "id": "4f",
        "description": "",
        "cost": 320,
        "currency": "$"
    },
    {
        "name": "Marvel",
        "id": "m",
        "description": "",
        "cost": 450,
        "currency": "$"
    },
    {
        "name": "Bravas/Aros",
        "id": "br",
        "description": "",
        "cost": 50,
        "currency": "$"
    },
    
]

function imprimir() {
    window.print();
}

function agregarProd(id) {
let htmlContentToAppend = "";
var precioTotal;
for (let i = 0; i < burguers.length; i++) {
    let burguer = burguers[i];
    
  

 if(burguer.id === id){  
htmlContentToAppend += 
`
    <tr>
    <td class="cantidad">`+ cant + `</td>
    <td class="producto">`+burguer.name+` </td>
    <td class="precio">`+burguer.currency+burguer.cost+`</td>
    </tr>
`
currentTicket.push(burguer)


}


}

tbody.innerHTML += htmlContentToAppend;
console.log(currentTicket)
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
        agregarProd(idProd)
 
      });

      document.getElementById("nuevo").addEventListener("click", function () {
        currentTicket=[]
        tbody.innerHTML = ""
 
      });

      document.getElementById("agregarDir").addEventListener("click", function () {
        document.getElementById("dire").innerHTML = '';
        var dire = document.getElementById("dire");
        var direccion = document.createTextNode(document.getElementById("nombreDir").value)
        dire.appendChild(direccion)
        
      });

});
