const cerrarSesion = document.querySelector(".cerrar-sesion");
const usuarioActual = JSON.parse(localStorage.getItem("usuarioActivo")); //agarramos el usuario activo
const confirmarCambios = document.querySelector(".confirmar-cambios__js");
//email-js

cerrarSesion.addEventListener("click", function () {
    localStorage.removeItem("usuarioActivo");
})

// --- correo electronico y usuario dinamicamente ---
let textoEmail = document.querySelector(".email-js");
let textoUsuario = document.querySelector(".usuario-js");
let correoActual = usuarioActual.correo; // guardamos el correo del usuario en un let
let nombreUsuarioActual = usuarioActual.usuario; // guardamos el nombre de usuario en un let

textoEmail.textContent = correoActual;  // hacemos que aparezca en pantalla el correo en modo de texto
textoUsuario.textContent = nombreUsuarioActual; // hacemos que aparezca en pantalla el nombre del usuario en modo de texto


// --- guardar los cambios del usuario ---
document.querySelector(".form").addEventListener("submit", function (event) {
    const contraseniaNueva = document.querySelector("#contraseña-nueva").value;
    const contraseniaRepetida = document.querySelector("#repetir-contraseña").value;
    const contraseniaValida = /^(?=(?:.*[A-Za-z]){2,})(?=(?:.*\d){2,})(?=(?:.*[!@#$%^&*()_\-+=?¿¡:;.,<>]){2,}).{8,}$/;
    const mensajeError1 = document.querySelector("#mensaje-error-js");
    const mensajeError2 = document.querySelector("#mensaje-errorb-js");

    if (!contraseniaValida.test(contraseniaNueva)) {
        event.preventDefault();
        mensajeError1.innerHTML = "La contraseña debe tener al menos 8 caracteres, 2 letras, 2 números y 2 símbolos";
        mensajeError1.style.color = "red";
    } else {
        mensajeError1.innerHTML = "";
    }
    if (contraseniaRepetida !== contraseniaNueva) {
        event.preventDefault();
        mensajeError2.innerHTML = "la contraseña no coincide";
        mensajeError2.style.color = "red";
    } else {
        mensajeError2.innerHTML = "";
    }
    // usuarioActual.contrasenia = contraseniaNueva;
    // localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActual));
    if (contraseniaRepetida === contraseniaNueva && contraseniaValida.test(contraseniaNueva)) {
        let usuarios = JSON.parse(localStorage.getItem("usuarios"));
        let usuarioBuscado = usuarios.find(
            (user) => user.usuario === usuarioActual.usuario);
        usuarioBuscado.contrasenia = contraseniaNueva;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        usuarioBuscado.contrasenia = contraseniaNueva;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
    

})



