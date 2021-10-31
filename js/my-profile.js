
var imgenPerfil = document.getElementById("imagenPerfil");
//objeto con los datos de perfil
var datosPerfil = {
    Nombre:"",
    Apellido: '',
    Edad: '',
    Mail:'',
    Telefono:'',
}; 

//FUNCION QUE GUARDA LOS DATOS DE PERFIL EN LOCALSTORAGE
function guardar(){
    //PRIMERO GUARDO LOS VALORES DE LOS INPUT EN EL OBJETO PREVIAMENTE CREADO
datosPerfil.Nombre = document.getElementById("nombre").value
datosPerfil.Apellido = document.getElementById("apellido").value
datosPerfil.Edad = document.getElementById("edad").value
datosPerfil.Mail = document.getElementById("mail").value
datosPerfil.Telefono = document.getElementById("telefono").value
//CONVIERTO LOS DATOS A FORMATO JSON 
var dataJson=JSON.stringify(datosPerfil)
//GUARDO LOS DATOS EN LOCALSTORAGE
localStorage.setItem("datosPerfil",dataJson)
}

//AGREGO UN AVENTO CHANGE AL INPUT FILE 
document.getElementById("avatar").addEventListener("change", function () {

     //muestro en pantalla la imagen seleccionada
     //input file permite seleccionar varios archivos y los guarda en un array, voy a utilizar solo el primero
     let foto = this.files[0];
     //El método URL.createObjectURL () creará una URL que apunta al objeto de parámetro en función de los parámetros pasados (foto)
     let objectURL = URL.createObjectURL(foto);
     //agrego la url al src de la imagen de perfil para mostrarla en pantalla
     imgenPerfil.src = objectURL;

    //GUARDO IMAGEN EN LOCALSTORAGE
    //FileReader es un objeto con el único porpósito de leer datos desde objetos de tipo Blob (por lo tanto File también).
    const reader = new FileReader();

    reader.addEventListener("load", ()=>{
        localStorage.setItem("imgPerfil",reader.result);
    })
    //readAsDataURL(blob) – lee los datos binarios y los codifica como [Datos URIs] en base 64
    reader.readAsDataURL(this.files[0])
  });

document.addEventListener("DOMContentLoaded", function (e) {

//cargar la imagen desde localstorage
var imgData = localStorage.getItem("imgPerfil")
if(imgData){
 imgenPerfil.src = imgData
}
    
//obtengo los datos de perfil del localstorage  
var dataLocal=localStorage.getItem("datosPerfil")
//si hay datos en el localstorage
if(dataLocal){
    //convierto en objeto los datos y los guardo en la variable datosPerfil
    datosPerfil = JSON.parse(dataLocal)
    //Muestro los datos en los input
document.getElementById("nombre").value = datosPerfil.Nombre 
document.getElementById("apellido").value = datosPerfil.Apellido 
document.getElementById("edad").value =  datosPerfil.Edad 
document.getElementById("mail").value  = datosPerfil.Mail
document.getElementById("telefono").value  = datosPerfil.Telefono
}




});