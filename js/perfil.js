const cerrarSesion = document.querySelector(".cerrar-sesion");
//email-js

cerrarSesion.addEventListener("click", function () {
    localStorage.removeItem("usuarioActivo");
})

// --- correo electronico y usuario dinamicamente ---
let textoEmail = document.querySelector(".email-js");
let textoUsuario = document.querySelector(".usuario-js");
const usuarioActual = JSON.parse(localStorage.getItem("usuarioActivo")); //agarramos el usuario activo
let correoActual = usuarioActual.correo; // guardamos el correo del usuario en un let
let nombreUsuarioActual = usuarioActual.usuario; // guardamos el nombre de usuario en un let

textoEmail.textContent = correoActual;  // hacemos que aparezca en pantalla el correo en modo de texto
textoUsuario.textContent = nombreUsuarioActual; // hacemos que aparezca en pantalla el nombre del usuario en modo de texto



