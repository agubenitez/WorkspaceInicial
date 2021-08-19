//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function() {
    //con este evento hago que cuando se haga click en el boton submit del formulario con id "formulario" se ejecute la funcion validarFormulario
       document.getElementById("formulario").addEventListener('submit', validarFormulario); 
  });
  
  // esta funcion valida que no haya campos vacios tanto en usuario como en contraseña, y si los hay se muestra un alert y un contorno rojo en el area de texto
  function validarFormulario(evento) {
    evento.preventDefault();
    //obtengo los input de usuario y contraseña mediante su id
    var usuario = document.getElementById('login');
    var clave = document.getElementById('password');
      
    // si el largo del valor del input es 0, significa que el campo esta vacio y en ese caso muestro el alert y el borde rojo
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
    //si no entra a ningun if, se ejecuta el submit del formulario que me va a llevar a home.html
    this.submit();
  }
