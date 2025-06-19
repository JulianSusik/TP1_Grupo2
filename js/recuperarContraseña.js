const usuarioGuardados = localStorage.getItem("usuarios")

document.addEventListener("DOMContentLoaded", function () {
  const correo = document.getElementById("correo");
  const usuario = document.getElementById("usuario");
  const boton = document.querySelector(".main__primary__form--items--buttonA");

  function actualizarEstadoBoton() {
    const correoValido = correo.value.trim() !== "";
    const usuarioValido = usuario.value.trim() !== "";

    boton.disabled = !(correoValido && usuarioValido);
  }

  correo.addEventListener("input", actualizarEstadoBoton);
  usuario.addEventListener("input", actualizarEstadoBoton);
});
