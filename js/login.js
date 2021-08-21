//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function() {
    //este evendo ejecuta la funcion validarFormulario cuando se apreta el boton "ingresar" del login
       document.getElementById("formulario").addEventListener('submit', validarFormulario); 
  });
  
  // esta funcion valida que no haya campos vacios tanto en usuario como en contraseña,
  // y si los hay se muestra un alert y un contorno rojo en el area de texto
  function validarFormulario(evento) {
    //este evento evita que se envie el formulario al hacer click en el boton
    //
    evento.preventDefault();
    //obtengo los input de usuario y contraseña mediante su id
    var usuario = document.getElementById('login');
    var clave = document.getElementById('password');
      
    // si el campo de usuario o contraseña estan vacios salgo de la funcion
    // al salir de la funcion no se ejecuta el submit del formulario
    // para alertar al usuario muestro un alert y cambio el borde de los input a rojo
    if(usuario.value.length == 0) {
      alert('No has escrito nada en el usuario');
      usuario.style.borderColor="red"
      return;
    }
    if (clave.value.length == 0) {
      alert('No has escrito nada en la contraseña');
      clave.style.borderColor="red"
      return;
    }

    //ejecuto el boton del formulario
    //esta parte solo se va a ejecutar si no se cumplen los if de arriba
    
    this.submit();
  }
