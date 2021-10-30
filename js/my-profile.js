
var imgenPerfil = document.getElementById("imagenPerfil");

var datosPerfil = {
    Nombre:"",
    Apellido: '',
    Edad: '',
    Mail:'',
    Telefono:'',
};
function mostrarFoto(){
   let files = document.getElementById("avatar").files
   let foto = files[0];
   let objectURL = URL.createObjectURL(foto);
   imgenPerfil.src = objectURL;
//En primer lugar, tomo mi imagen getElementByIDy la guardo como Base64.
//Luego guardo la cadena Base64 como mi localStoragevalor.
   imgPerfil64 = getBase64Image(imgenPerfil);
   localStorage.setItem("imgPerfil", imgPerfil64);
}

//funcion que combierte la imagen a base64
// function getBase64Image(img) {
//     var canvas = document.createElement("canvas");
//     canvas.width = img.width;
//     canvas.height = img.height;

//     var ctx = canvas.getContext("2d");
//     ctx.drawImage(img, 0, 0);

//     var dataURL = canvas.toDataURL();

//     return dataURL;
// }

function guardar(){
datosPerfil.Nombre = document.getElementById("nombre").value
datosPerfil.Apellido = document.getElementById("apellido").value
datosPerfil.Edad = document.getElementById("edad").value
datosPerfil.Mail = document.getElementById("mail").value
datosPerfil.Telefono = document.getElementById("telefono").value

var dataJson=JSON.stringify(datosPerfil)
localStorage.setItem("datosPerfil",dataJson)

}

document.getElementById("avatar").addEventListener("change", function () {
 
    const reader = new FileReader();
    reader.addEventListener("load", ()=>{
        localStorage.setItem("imgPerfil",reader.result);
    })
    reader.readAsDataURL(this.files[0])

    let foto = this.files[0];
    let objectURL = URL.createObjectURL(foto);
    imgenPerfil.src = objectURL;

  });


document.addEventListener("DOMContentLoaded", function (e) {

//cargar la imagen desde localstorage

var imgData = localStorage.getItem("imgPerfil")
if(imgData){
 imgenPerfil.src = imgData
}
 
   
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