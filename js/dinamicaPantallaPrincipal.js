const SERIES_Y_PELICULAS = JSON.parse(localStorage.getItem("seriesYPeliculas"));
const rutaActual = window.location.pathname;
const selectCategoria = document.getElementById("categoria");
const busquedaNombre = document.getElementById("buscador")
//Nos trae en que parte de la url estamos, ej serie.html o pelicula.html

function mostrarPeliculasYSeries(arrayDePeliculasYSeries) {
    const nodoElement = document.querySelector(".grilla-contenido");
    nodoElement.innerHTML = "";
    arrayDePeliculasYSeries.forEach(seriesYPeliculas => {
        const contenidoElement = document.createElement("a");
        const tituloElement = document.createElement("h4");
        tituloElement.innerHTML = `${seriesYPeliculas.nombre}`;
        tituloElement.className = "titulo-tarjeta";
        contenidoElement.href = `./serie-pelicula.html?id=${seriesYPeliculas.id}`;
        contenidoElement.className = "tarjeta-contenido";
        const imagenElement = document.createElement("img");
        imagenElement.src = seriesYPeliculas.imagen.url;
        imagenElement.alt = seriesYPeliculas.imagen.alt;
        contenidoElement.appendChild(imagenElement);
        contenidoElement.appendChild(tituloElement);
        nodoElement.appendChild(contenidoElement);
    });//Esta funcion crea todas las peliculas y series dinamicas en el html principal
    //Recorriendo todo el array de objetos y por cada objeto crea su a con img
}
/*
function mostrarPeliculasYSeries(arrayDePeliculasYSeries) {
    const nodoElement = document.querySelector(".grilla-contenido");
    nodoElement.innerHTML = "";

    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    const todosLosUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let favoritos = [];

    if (usuarioActivo) {
        const usuarioData = todosLosUsuarios.find(u => u.usuario === usuarioActivo.usuario);
        if (usuarioData && Array.isArray(usuarioData.favoritos)) {
            favoritos = usuarioData.favoritos;
        }
    }

    arrayDePeliculasYSeries.forEach(item => {
        const contenidoElement = document.createElement("a");
        contenidoElement.className = "tarjeta-contenido";
        contenidoElement.href = `./serie-pelicula.html?id=${item.id}`;

        const imagenElement = document.createElement("img");
        imagenElement.src = item.imagen.url;
        imagenElement.alt = item.imagen.alt;

        const tituloElement = document.createElement("h4");
        tituloElement.className = "titulo-tarjeta";
        tituloElement.textContent = item.nombre;

        const corazon = document.createElement("span");
        corazon.classList.add("corazon");
        corazon.dataset.id = item.nombre;  // Usás el nombre como ID único
        corazon.innerHTML = "❤";

        // ✅ Si ya es favorito, marcarlo
        if (favoritos.includes(item.nombre)) {
            corazon.classList.add("favorito");
        }

        // Añadir elementos al DOM
        contenidoElement.appendChild(imagenElement);
        contenidoElement.appendChild(tituloElement);
        contenidoElement.appendChild(corazon);
        nodoElement.appendChild(contenidoElement);
    });
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("corazon")) {
        e.preventDefault(); // Evita que el enlace se ejecute
        e.stopPropagation(); // Evita que el evento burbujee al <a>

        const id = e.target.dataset.id;
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

        if (!usuarioActivo) {
            alert("Inicia sesión para guardar favoritos.");
            return;
        }

        const usuarioIndex = usuarios.findIndex(u => u.usuario === usuarioActivo.usuario);
        if (usuarioIndex === -1) return;

        const user = usuarios[usuarioIndex];
        if (!user.favoritos) user.favoritos = [];

        if (user.favoritos.includes(id)) {
            // Quitar
            user.favoritos = user.favoritos.filter(fav => fav !== id);
            e.target.classList.remove("favorito");
        } else {
            // Agregar
            user.favoritos.push(id);
            e.target.classList.add("favorito");
        }

        // Guardar cambios
        usuarios[usuarioIndex] = user;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.setItem("usuarioActivo", JSON.stringify(user));
    }
});Despues probar bien el tema de los corazones pero va bastante bien
*/ 

function aplicarFiltros(){
    const valorElegido = selectCategoria.value.toLowerCase();
    const busquedaPalabra = busquedaNombre.value.toLowerCase();

    let resultados = SERIES_Y_PELICULAS; //Creamos un array auxiliar llamado resultados para ir filtrando sobre este mismo

    if(valorElegido !== ""){
        resultados = resultados.filter(seriesOPeliculas => seriesOPeliculas.genero.toLowerCase() === valorElegido);
    }
    if(busquedaPalabra !== ""){
        resultados = resultados.filter(seriesOPeliculas => seriesOPeliculas.nombre.toLowerCase().includes(busquedaPalabra));
    }

    if(rutaActual.includes("serie")){
        resultados = resultados.filter(seriesOPeliculas => seriesOPeliculas.tipo === "serie");
    }else if(rutaActual.includes("pelicula")){
        resultados = resultados.filter(seriesOPeliculas => seriesOPeliculas.tipo === "pelicula");
    }
    mostrarPeliculasYSeries(resultados);
}

document.addEventListener("DOMContentLoaded", () => {
    aplicarFiltros();
})
selectCategoria.addEventListener("change", aplicarFiltros);
busquedaNombre.addEventListener("keyup", aplicarFiltros);