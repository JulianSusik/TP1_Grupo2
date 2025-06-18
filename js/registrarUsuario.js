function validarSoloLetras(idCampo, idError) { //Funcion donde pasamos los parametros (el input y el error)
  let valor = document.getElementById(idCampo).value;  //busca el elemento x id y obtenemos el valor que escribió el usuario en el input con el ID recibido
  let error = document.getElementById(idError);  //se obtiene el error


  const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/; //este es el regex para que solo haya letras tildes, ñ y espacios (/S) 

  if (!soloLetras.test(valor)) { //si hay algun caracter que no sea una letra 
    error.innerHTML = "Solo se permiten letras"; //mostramos este erro en el html sino no mostramos nada
    error.style.color = "red";
    console.log("error por el valor:", valor);
  } else {
    error.innerHTML = "";
  }
}


function validarSoloNumerosYLetras(idCampo, idError) {
  let valor = document.getElementById(idCampo).value;
  let error = document.getElementById(idError);


  const soloNumerosYLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]*$/;

  if (!soloNumerosYLetras.test(valor)) {
    error.innerHTML = "Solo se permiten letras y numeros";
    error.style.color = "red";
  } else {
    error.innerHTML = "";
  }
}

function validarEmail(idCampo, idError) {
  let valor = document.getElementById(idCampo).value;
  let error = document.getElementById(idError);

  const emailValido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  //verificamos q haya algo antes y despues de un @ y que haya un punto y al menos dos letras despues

  if (!emailValido.test(valor)) {
    error.innerHTML = "Ingrese un email válido (ej: ejemplo@correo.com)";
    error.style.color = "red";
  } else {
    error.innerHTML = "";
  }
}

function validarContrasenia(idCampo, idError) {
  let valor = document.getElementById(idCampo).value;
  let error = document.getElementById(idError);

  const contraseniaValida = /^(?=(?:.*[A-Za-z]){2,})(?=(?:.*\d){2,})(?=(?:.*[!@#$%^&*()_\-+=?¿¡:;.,<>]){2,}).{8,}$/;

  if (!contraseniaValida.test(valor)) {
    error.innerHTML = "La contraseña debe tener al menos 8 caracteres, 2 letras, 2 números y 2 símbolos";
    error.style.color = "red";
  } else {
    error.innerHTML = "";
  }
}

function validarConfirmarContrasenia(idCampo, idError, idContraseniaOriginal) {
  let valor = document.getElementById(idCampo).value;
  let original = document.getElementById(idContraseniaOriginal).value;
  let error = document.getElementById(idError);

  if (valor !== original) {
    error.innerHTML = "Las contraseñas no coinciden";
    error.style.color = "red";
  } else {
    error.innerHTML = "";
  }
}

function validarNumeroTarjeta(idCampo, idError) {
  let valor = document.getElementById(idCampo).value;
  let error = document.getElementById(idError);

  const numeroTarjetaValido = /^\d{16}$/;

  if (!numeroTarjetaValido.test(valor)) {
    error.innerHTML = "Debe contener exactamente 16 dígitos";
    error.style.color = "red";
    return;
  }

  // se suman los primeros 15 numeros
  let suma = 0;
  for (let i = 0; i < 15; i++) {
    suma += +valor[i];
  }
  console.log("Suma total:", suma);

  let ultimoDigito = +valor[15];


  if (suma % 2 == 1) { // si la suma es impar
    if (ultimoDigito % 2 == 0) { // y el ultimo digito es par
      error.innerHTML = ""; // es correcto y no ponemos ningun error
    } else {
      error.innerHTML = "El último dígito debe ser par (la suma de los anteriores es impar)";
      error.style.color = "red";
    }
  } else { // si la suma es par
    if (ultimoDigito % 2 == 1) {
      error.innerHTML = "";
    } else {
      error.innerHTML = "El último dígito debe ser impar (la suma de los anteriores es par)";
      error.style.color = "red";
    }
  }
}



function validarCodTarjeta(idCampo, idError) {
  let valor = document.getElementById(idCampo).value.trim();
  let error = document.getElementById(idError);

  const codigoTarjetaValido = /^\d{3}$/;

  if (!codigoTarjetaValido.test(valor)) {
    error.innerHTML = "Debe contener exactamente 3 números.";
    error.style.color = "red";
  } else if (valor === "000") {
    error.innerHTML = "La clave no puede ser 000.";
    error.style.color = "red";
  } else {
    error.innerHTML = "";
  }
}


function esTarjetaSeleccionada() {
  return document.getElementById("tarjeta").checked;
}

document.getElementById("nombre").addEventListener("input", function () {  //buscamos el elemento x id y cuando el usuario modifica el input se ejecuta el evento
  validarSoloLetras("nombre", "error-nombre"); //funcion anonima q se ejecuta cuando ocurre el evento
  // actualizarEstadoBoton();
});

document.getElementById("apellido").addEventListener("input", function () {
  validarSoloLetras("apellido", "error-apellido");
  //  actualizarEstadoBoton();
});

document.getElementById("correo").addEventListener("input", function () {
  validarEmail("correo", "error-email");
  // actualizarEstadoBoton();
});

document.getElementById("usuario").addEventListener("input", function () {
  validarSoloNumerosYLetras("usuario", "error-usuario");
  // actualizarEstadoBoton();
});

document.getElementById("contrasenia").addEventListener("input", function () {
  validarContrasenia("contrasenia", "error-contrasenia");
  // actualizarEstadoBoton();
});

document.getElementById("contraseniaB").addEventListener("input", function () {
  validarConfirmarContrasenia("contraseniaB", "error-contraseniaB", "contrasenia");
  // actualizarEstadoBoton();
});

document.getElementById("numeroTarjeta").addEventListener("input", function () {
  if (esTarjetaSeleccionada()) {
    validarNumeroTarjeta("numeroTarjeta", "error-numeroTarjeta");
  } else {
    document.getElementById("error-numeroTarjeta").innerHTML = "";
  }
  // actualizarEstadoBoton();
});

document.getElementById("codTarjeta").addEventListener("input", function () {
  if (esTarjetaSeleccionada()) {
    validarCodTarjeta("codTarjeta", "error-codTarjeta");
  } else {
    document.getElementById("error-codTarjeta").innerHTML = "";
  }
  //actualizarEstadoBoton();
});

document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll('input[name="tipoCupon"]');

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        checkboxes.forEach(cb => {
          if (cb !== checkbox) cb.checked = false;
        });
      }
    });
  });
});

// si se cambia el metodo de pago se borran los errores
const opcionesMetodoPago = document.querySelectorAll("input[name='metodoPago']");
opcionesMetodoPago.forEach(function (opcion) {
  opcion.addEventListener("change", function () {
    console.log("Método de pago seleccionado:", opcion.id);
    if (!esTarjetaSeleccionada()) {
      document.getElementById("numeroTarjeta").value = "";
      document.getElementById("codTarjeta").value = "";
      document.getElementById("error-numeroTarjeta").innerHTML = "";
      document.getElementById("error-codTarjeta").innerHTML = "";

      //actualizarEstadoBoton();
    }
    if (opcion.id !== "cupon") {
      const checkboxesCupon = document.querySelectorAll('input[name="tipoCupon"]');
      checkboxesCupon.forEach(cb => cb.checked = false);
    }
  });
});
// si se cambia el metodo de pago se borran los errores




document.querySelector(".primary__main__form").addEventListener("submit", function (event) { //aplicando el DOM buscamos el formulario con el query selector y escucha el evento sumbit
  // se prueban las validaciones
  validarSoloLetras("nombre", "error-nombre");
  validarSoloLetras("apellido", "error-apellido");
  validarEmail("correo", "error-email");
  validarSoloNumerosYLetras("usuario", "error-usuario");
  validarContrasenia("contrasenia", "error-contrasenia");
  validarConfirmarContrasenia("contraseniaB", "error-contraseniaB", "contrasenia");
  if (esTarjetaSeleccionada()) {
    validarNumeroTarjeta("numeroTarjeta", "error-numeroTarjeta");
    validarCodTarjeta("codTarjeta", "error-codTarjeta");
  } else {
    document.getElementById("error-numeroTarjeta").innerHTML = "";
    document.getElementById("error-codTarjeta").innerHTML = "";
  }



  const errores = document.querySelectorAll("p.mensaje-error"); // busca todos los elementos p con clase mensaje-error donde se muestran los errores osea si hay texto
  let hayErrores = false; // variable que usamos como bandera

  errores.forEach(function (p) { //se recorre cada elemento p de la lista de errores
    if (p.innerText.trim() !== "") {  //el .trim es para que no tome como valido los espacios
      hayErrores = true;
    }
  });


  if (hayErrores) {
    event.preventDefault();
    alert("Por favor, corregí los errores antes de enviar el formulario");
  }

});

document.querySelector("#buttonConfirm").addEventListener("click", function () {
  //vuelvo a poner las validaciones para q no guarde cosas vacias o con errores
  validarSoloLetras("nombre", "error-nombre");
  validarSoloLetras("apellido", "error-apellido");
  validarEmail("correo", "error-email");
  validarSoloNumerosYLetras("usuario", "error-usuario");
  validarContrasenia("contrasenia", "error-contrasenia");
  validarConfirmarContrasenia("contraseniaB", "error-contraseniaB", "contrasenia");

  if (esTarjetaSeleccionada()) {
    validarNumeroTarjeta("numeroTarjeta", "error-numeroTarjeta");
    validarCodTarjeta("codTarjeta", "error-codTarjeta");
  } else {
    document.getElementById("error-numeroTarjeta").innerHTML = "";
    document.getElementById("error-codTarjeta").innerHTML = "";
  }
  let errores = document.querySelectorAll("p.mensaje-error");// verificamos que no haya errores
  let hayErrores = false;
  errores.forEach(function (p) {
    if (p.innerText.trim() !== "") {
      hayErrores = true;
    }
  });
  if (hayErrores) {
    alert("No se pueden guardar los datos. Hay errores en el formulario.");
    return;
  }
  let nombreUsuarioNuevo = document.querySelector("#nombre").value;
  let apellidoUsuarioNuevo = document.querySelector("#apellido").value;
  let correoUsuarioNuevo = document.querySelector("#correo").value;
  let nombreDeUsuarioUsuarioNuevo = document.querySelector("#usuario").value;
  let contraseniaUsuarioNuevo = document.querySelector("#contrasenia").value;



  let nuevoUsuario = {
    nombre: nombreUsuarioNuevo,
    apellido: apellidoUsuarioNuevo,
    correo: correoUsuarioNuevo,
    usuario: nombreDeUsuarioUsuarioNuevo,
    contrasenia: contraseniaUsuarioNuevo
  };

  let usuarioGuardados = localStorage.getItem("usuarios");
  let usuarios;
  if (usuarioGuardados != null) {
    usuarios = JSON.parse(usuarioGuardados);
  } else {
    usuarios = [];
  }
  // el metodo .some devuelve true si se cumple al menos una condicio
  let usuarioExistente = usuarios.some(function (usuario) {
    return usuario.usuario === nuevoUsuario.usuario || usuario.correo === nuevoUsuario.correo; //verificamos que no se repita usuario o mail
  });
  if (usuarioExistente) {
    alert("El nombre de usuario o el correo ya están registrados.");
    return;
  }


  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Usuario registrado con éxito");

});
/*
   window.addEventListener("DOMContentLoaded", function () {
     actualizarEstadoBoton();
   });

function actualizarEstadoBoton() {
  const errores = document.querySelectorAll("p.mensaje-error");
  let hayErrores = false;
  
  errores.forEach(function (p) {
    if (p.innerText.trim() !== "") {
      hayErrores = true;
    }
  });

  document.getElementById("buttonConfirm").disabled = hayErrores;
}
*/

