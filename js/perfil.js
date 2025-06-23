const SERIES_Y_PELICULAS = JSON.parse(localStorage.getItem("seriesYPeliculas"));
const cerrarSesion = document.querySelector(".cerrar-sesion");
const usuarioActual = JSON.parse(localStorage.getItem("usuarioActivo")); //agarramos el usuario activo
const confirmarCambios = document.querySelector(".confirmar-cambios__js");


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
    if (contraseniaRepetida === contraseniaNueva && contraseniaValida.test(contraseniaNueva)) {
        let usuarios = JSON.parse(localStorage.getItem("usuarios"));
        let usuarioBuscado = usuarios.find(
            (user) => user.usuario === usuarioActual.usuario);
            usuarioBuscado.contrasenia = contraseniaNueva;
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            usuarioBuscado.contrasenia = contraseniaNueva;
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            usuarioActual.contrasenia = contraseniaNueva;
            localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActual));
    }
    

})

//--- eliminar usuario del LocalStorage ---
function eliminarUsuario (){
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    let usuarioActual = JSON.parse(localStorage.getItem("usuarioActivo"));
    let nuevosUsuarios = usuarios.filter(function(user){
        return user.usuario != usuarioActual.usuario;
    })
    localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios))
    localStorage.removeItem("usuarioActivo")
}


document.querySelector(".boton-cancelar-js").addEventListener("click", function(){
    eliminarUsuario ();
})

function mostrarMetodoDePago (){
    const RadioTarjeta = document.querySelector("#tarjeta-credito");
    const radioCupon = document.querySelector("#cupon");
    if (usuarioActual.metodoPago === "Tarjeta de crédito"){
        RadioTarjeta.checked = true;
        let campoTarjeta = document.querySelector("#campo-texto-tarjeta");
        campoTarjeta.placeholder = usuarioActual.numeroTarjeta;
    }
    if (usuarioActual.metodoPago === "Cupón de pago"){
        radioCupon.checked = true;
        if (usuarioActual.tipoCupon[0] === "Pago Fácil"){  //Pongo el 0 para que se fije en la primera posicion del array
            let checkboxPagoFacil = document.querySelector("#PF").checked = true;
        }
        if (usuarioActual.tipoCupon[0] === "RapiPago"){  //Pongo el 0 para que se fije en la primera posicion del array
            let checkboxPagoFacil = document.querySelector("#RP").checked = true;
        }
    }
    if (usuarioActual.metodoPago === "Transferencia bancaria"){
        const TransferenciaBancaria = document.querySelector("#Transferencia").checked = true;
    }
}

mostrarMetodoDePago();

// ---------------------------------------------------------

function inicializarCarrusel(idCarrusel, items) {//Crea el mismo carrusel que hay en serie-pelicula.html. Pasando por parametro el id del html carrusel  y los items que debe colocar dentro
    const carruselElement = document.getElementById(idCarrusel);
    const contenedor = carruselElement.parentElement;
    const btnPrev = contenedor.querySelector(".prev");
    const btnNext = contenedor.querySelector(".next");

    let index = 0;

    items.forEach(() => {
        const slide = document.createElement("div");//Crea los slides vacios 
        slide.classList.add("slide");
        carruselElement.appendChild(slide);
    });

    const slides = carruselElement.querySelectorAll(".slide");

    function actualizarCarrusel() {
        slides.forEach((slide, i) => {
            slide.classList.remove("activo");//Cada vez que se actualiza el i (indice) remueve el que esta activo
            slide.innerHTML = "";//Ademas de vaciarlo

            if (i === index) {//Si coincide, le agrega la clase activo y crea la tarjeta con <a> y la img
                slide.classList.add("activo");

                const linkElement = document.createElement("a");
                linkElement.href = `serie-pelicula.html?id=${items[index].id}`;

                const img = document.createElement("img");
                img.src = items[index].imagen.url;
                img.alt = items[index].imagen.alt;

                linkElement.appendChild(img);
                slide.appendChild(linkElement);
            }
        });
    }

    function mostrarSiguiente() {
        index = (index + 1) % items.length;
        actualizarCarrusel();
    }

    function mostrarAnterior() {
        index = (index - 1 + items.length) % items.length;
        actualizarCarrusel();
    }

    btnPrev.addEventListener("click", mostrarAnterior);//Ambas funciones aumentan o disminuyen el indice y no le permite excederse del maximo o minimo
    btnNext.addEventListener("click", mostrarSiguiente);

    actualizarCarrusel();
}

document.addEventListener("DOMContentLoaded", function () {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioData = usuarios.find(u => u.usuario === usuarioActivo?.usuario);//Busca el usuario activo en usuarios. El ? hace que devuelva null o undefined si no lo encuentra

    const favoritosSeries = usuarioData.favoritos.series || []; //Crea el array de series favoritas o vacio si no hay ninguna
    const favoritosPeliculas = usuarioData.favoritos.peliculas || [];//Crea el array de peliculas favoritas o vacio si no hay

    const seriesFavoritas = SERIES_Y_PELICULAS.filter(p => p.tipo === "serie" && favoritosSeries.includes(p.id));
    const peliculasFavoritas = SERIES_Y_PELICULAS.filter(p => p.tipo === "pelicula" && favoritosPeliculas.includes(p.id));
    //Busca en el array total todas las peliculas y series favoritas para poder traer sus datos 


    inicializarCarrusel("carrusel-series", seriesFavoritas);//Crea carrusel de serie con series favoritas
    inicializarCarrusel("carrusel-peliculas", peliculasFavoritas);//Crea carrusel de peliculas con peliculas favoritas
});