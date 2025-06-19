// guardamos los mensajes de error
const ERROR_MESSAGES = {
  nombre: "Solo se permiten letras",
  apellido: "Solo se permiten letras",
  correo: "Ingrese un email válido (ej: ejemplo@correo.com)",
  usuario: "Solo se permiten letras y números",
  contrasenia: "La contraseña debe tener al menos 8 caracteres, 2 letras, 2 números y 2 símbolos",
  contraseniaB: "Las contraseñas no coinciden",
  numeroTarjeta: "Debe contener exactamente 16 dígitos",
  codTarjeta: "Debe contener exactamente 3 números",
  codTarjetaZeros: "La clave no puede ser 000",
  tarjetaPar: "El último dígito debe ser par (la suma de los anteriores es impar)",
  tarjetaImpar: "El último dígito debe ser impar (la suma de los anteriores es par)"
};





 
  function loginValidate() {
    let esValido = true;
    
    // Validar nombre 
    const nombre = document.getElementById("nombre").value;
    const nombreError = document.querySelector('.js-nombre-error');
    if (nombre.trim() === "") {
  nombreError.textContent = ""; 
} else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
  nombreError.textContent = ERROR_MESSAGES.nombre;
  esValido = false;
} else {
  nombreError.textContent = "";
}

  
  // Validar apellido 
  const apellido = document.getElementById("apellido").value;
  const apellidoError = document.querySelector('.js-apellido-error');
  if (apellido.trim() === "") {
  apellidoError.textContent = "";
} else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido)) {
  apellidoError.textContent = ERROR_MESSAGES.apellido;
  esValido = false;
} else {
  apellidoError.textContent = "";
}

  
  // Validar correo
  const correo = document.getElementById("correo").value;
  const emailError = document.querySelector('.js-email-error');
  if (correo.trim() === "") {
  emailError.textContent = "";
} else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correo)) {
  emailError.textContent = ERROR_MESSAGES.correo;
  esValido = false;
} else {
  emailError.textContent = "";
}

  
  // Validar usuario 
  const usuario = document.getElementById("usuario").value;
  const usuarioError = document.querySelector('.js-usuario-error');
  if (usuario.trim() === "") {
  usuarioError.textContent = "";
} else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]+$/.test(usuario)) {
  usuarioError.textContent = ERROR_MESSAGES.usuario;
  esValido = false;
} else {
  usuarioError.textContent = "";
}

  
  // Validar contraseña
  const contrasenia = document.getElementById("contrasenia").value;
  const contraseniaError = document.querySelector('.js-contrasenia-error');
  if (contrasenia.trim() === "") {
  contraseniaError.textContent = "";
} else if (!/^(?=(?:.*[A-Za-z]){2,})(?=(?:.*\d){2,})(?=(?:.*[!@#$%^&*()_\-+=?¿¡:;.,<>]){2,}).{8,}$/.test(contrasenia)) {
  contraseniaError.textContent = ERROR_MESSAGES.contrasenia;
  esValido = false;
} else {
  contraseniaError.textContent = "";
}

  
  // Validar confirmacion de contraseña
  const contraseniaB = document.getElementById("contraseniaB").value;
  const contraseniaBError = document.querySelector('.js-contraseniaB-error');
  if (contrasenia.trim() === "" || contraseniaB.trim() === "") {
  contraseniaBError.textContent = "";
} else if (contrasenia !== contraseniaB) {
  contraseniaBError.textContent = ERROR_MESSAGES.contraseniaB;
  esValido = false;
} else {
  contraseniaBError.textContent = "";
}

  
  // Validar metodo de pago
  const metodoPagoSeleccionado = document.querySelector("input[name='metodoPago']:checked");
  if (!metodoPagoSeleccionado) {
    esValido = false;
  }
  
  // Validar datos de tarjeta si está seleccionada
  if (metodoPagoSeleccionado && metodoPagoSeleccionado.id === "tarjeta") {
    // Validar número de tarjeta
    const numeroTarjeta = document.getElementById("numeroTarjeta").value;
    const numeroTarjetaError = document.getElementById('error-numeroTarjeta');
    
    if (!/^\d{16}$/.test(numeroTarjeta)) {
      numeroTarjetaError.textContent = ERROR_MESSAGES.numeroTarjeta;
      esValido = false;
    } else {
      // Validar último dígito según suma de los 15 anteriores
      let suma = 0;
      for (let i = 0; i < 15; i++) {
        suma += parseInt(numeroTarjeta[i]);
      }
      const ultimoDigito = parseInt(numeroTarjeta[15]);
      
      if (suma % 2 === 1) { // suma impar
        if (ultimoDigito % 2 !== 0) { // último dígito debe ser par
          numeroTarjetaError.textContent = ERROR_MESSAGES.tarjetaPar;
          esValido = false;
        } else {
          numeroTarjetaError.textContent = "";
        }
      } else { // suma par
        if (ultimoDigito % 2 !== 1) { // último dígito debe ser impar
          numeroTarjetaError.textContent = ERROR_MESSAGES.tarjetaImpar;
          esValido = false;
        } else {
          numeroTarjetaError.textContent = "";
        }
      }
    }
    
    // Validar codigo de tarjeta
    const codTarjeta = document.getElementById("codTarjeta").value;
    const codTarjetaError = document.getElementById('error-codTarjeta');
    
    if (!/^\d{3}$/.test(codTarjeta)) {
      codTarjetaError.textContent = ERROR_MESSAGES.codTarjeta;
      esValido = false;
    } else if (codTarjeta === "000") {
      codTarjetaError.textContent = ERROR_MESSAGES.codTarjetaZeros;
      esValido = false;
    } else {
      codTarjetaError.textContent = "";
    }
  } else {
    // Limpiar errores de tarjeta si no esta seleccionada
    document.getElementById('error-numeroTarjeta').textContent = "";
    document.getElementById('error-codTarjeta').textContent = "";
  }
  
  // actualizar boton
  const boton = document.getElementById("buttonConfirm");
  const camposObligatorios = [nombre, apellido, correo, usuario, contrasenia, contraseniaB];
  
  if (metodoPagoSeleccionado && metodoPagoSeleccionado.id === "tarjeta") {
    const numeroTarjeta = document.getElementById("numeroTarjeta").value;
    const codTarjeta = document.getElementById("codTarjeta").value;
    camposObligatorios.push(numeroTarjeta, codTarjeta);
  }
  
  const camposVacios = camposObligatorios.some(campo => campo.trim() === "");
  boton.disabled = !esValido || camposVacios || !metodoPagoSeleccionado;
  
  return esValido && !camposVacios && metodoPagoSeleccionado;
}

// Función para guardar en localStorage
function guardarUsuario() {
  if (!loginValidate()) {
    alert("No se pueden guardar los datos. Hay errores en el formulario.");
    return false;
  }
  
  const nuevoUsuario = {
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    correo: document.getElementById("correo").value,
    usuario: document.getElementById("usuario").value,
    contrasenia: document.getElementById("contrasenia").value
  };
  
  // Obtener usuarios existentes
  let usuarios = [];
  const usuariosGuardados = localStorage.getItem("usuarios");
  if (usuariosGuardados) {
    usuarios = JSON.parse(usuariosGuardados);
  }
  
  // Verificar si el usuario ya existe
  const usuarioExistente = usuarios.some(usuario => 
    usuario.usuario === nuevoUsuario.usuario || usuario.correo === nuevoUsuario.correo
  );
  
  if (usuarioExistente) {
    alert("El nombre de usuario o el correo ya están registrados.");
    return false;
  }
  
  // Guardar nuevo usuario
  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Usuario registrado con éxito");
  return true;
}

// Event listeners
document.addEventListener("DOMContentLoaded", function() {
  // Validar en tiempo real mientras se escribe
  const campos = ["nombre", "apellido", "correo", "usuario", "contrasenia", "contraseniaB", "numeroTarjeta", "codTarjeta"];
  
  campos.forEach(campo => {
    const elemento = document.getElementById(campo);
    if (elemento) {
      elemento.addEventListener("input", loginValidate);
    }
  });
  
  // Validar cuando cambia el método de pago
  const opcionesMetodoPago = document.querySelectorAll("input[name='metodoPago']");
  opcionesMetodoPago.forEach(opcion => {
    opcion.addEventListener("change", function() {
      // Limpiar campos de tarjeta si no está seleccionada
      if (opcion.id !== "tarjeta") {
        document.getElementById("numeroTarjeta").value = "";
        document.getElementById("codTarjeta").value = "";
      }
      loginValidate();
    });
  });
  
  // Botón de confirmación
  document.getElementById("buttonConfirm").addEventListener("click", guardarUsuario);
  
  // Envío del formulario
  const formulario = document.querySelector(".primary__main__form");
  if (formulario) {
    formulario.addEventListener("submit", function(event) {
      if (!loginValidate()) {
        event.preventDefault();
        alert("Por favor, corregí los errores antes de enviar el formulario");
      }
    });
  }
  
 
});
loginValidate();