//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var datosPerfil = {
    Nombre:'',
    Apellido: '',
    Edad: '',
    Mail:'',
    Telefono:'',

};

function guardar(){
datosPerfil.Nombre = document.getElementById("nombre").value
datosPerfil.Apellido = document.getElementById("apellido").value
datosPerfil.Edad = document.getElementById("edad").value
datosPerfil.Mail = document.getElementById("mail").value
datosPerfil.Telefono = document.getElementById("telefono").value

var dataJson=JSON.stringify(datosPerfil)
localStorage.setItem("datosPerfil",dataJson)

}

document.addEventListener("DOMContentLoaded", function (e) {

//obtengo los datos de perfil del localstorage   
var dataLocal=localStorage.getItem("datosPerfil")
//convierto en objeto los datos y los guardo en la variable datosPerfil
datosPerfil =JSON.parse(dataLocal)
//Muestro los datos en los input
document.getElementById("nombre").value = datosPerfil.Nombre 
 document.getElementById("apellido").value = datosPerfil.Apellido 
document.getElementById("edad").value =  datosPerfil.Edad 
 document.getElementById("mail").value  = datosPerfil.Mail
 document.getElementById("telefono").value  = datosPerfil.Telefono

});