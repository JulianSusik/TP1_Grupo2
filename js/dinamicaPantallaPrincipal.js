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