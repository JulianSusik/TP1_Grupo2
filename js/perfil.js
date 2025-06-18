const cerrarSesion = document.querySelector(".cerrar-sesion");

cerrarSesion.addEventListener("click", function(){
    localStorage.removeItem("usuarioActivo");
})