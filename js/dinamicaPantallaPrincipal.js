const SERIES_Y_PELICULAS = JSON.parse(localStorage.getItem("seriesYPeliculas"));
const rutaActual = window.location.pathname;
const selectCategoria = document.getElementById("categoria");
//Nos trae en que parte de la url estamos, ej serie.html o pelicula.html

function mostrarPeliculasYSeries(arrayDePeliculasYSeries) {
    const nodoElement = document.querySelector(".grilla-contenido");
    nodoElement.innerHTML = "";
    arrayDePeliculasYSeries.forEach(seriesYPeliculas => {
        const contenidoElement = document.createElement("a");
        contenidoElement.href = `./serie-pelicula.html?id=${seriesYPeliculas.id}`;
        contenidoElement.className = "tarjeta-contenido";
        const imagenElement = document.createElement("img");
        imagenElement.src = seriesYPeliculas.imagen.url;
        imagenElement.alt = seriesYPeliculas.imagen.alt;
        contenidoElement.appendChild(imagenElement);
        nodoElement.appendChild(contenidoElement);
    });//Esta funcion crea todas las peliculas y series dinamicas en el html principal
    //Recorriendo todo el array de objetos y por cada objeto crea su a con img
}

function mostrarPeliculasOSeriesSegunRuta(arrayDePeliculasYSeries, rutaActual) {
    const filtrado = arrayDePeliculasYSeries.filter(seriesOPeliculas => seriesOPeliculas.tipo == rutaActual);
    //Filtramos el array para asegurarnos que es solo de series o solo de peliculas
    mostrarPeliculasYSeries(filtrado);
    //Reutilizamos la funcion anterior y le pasamos el array pero con solamente las series o peliculas necesarias
}

console.log(rutaActual);
if (rutaActual.includes("serie")) {
    mostrarPeliculasOSeriesSegunRuta(SERIES_Y_PELICULAS, "serie"); //Si es serie pasamos el array y la palabra serie para ruta actual
} else if (rutaActual.includes("pelicula")) {
    mostrarPeliculasOSeriesSegunRuta(SERIES_Y_PELICULAS, "pelicula"); //Si es serie pasamos el array la palabra pelicula para ruta actual
} else if (rutaActual.includes("pantalla-principal")) {
    mostrarPeliculasYSeries(SERIES_Y_PELICULAS); //Si no es solo pelicula o solo serie mostramos todo
}

selectCategoria.addEventListener("change", () => {
    const valorElegido = selectCategoria.value.toLowerCase();
    const filtradoPorCategoria = SERIES_Y_PELICULAS.filter(seriesOPeliculas => seriesOPeliculas.genero.toLowerCase() == valorElegido);

    /*    if(valorElegido === ""){
            mostrarPeliculasYSeries(SERIES_Y_PELICULAS);
        }else{
            
            console.log("Películas filtradas:", filtradoPorCategoria);
            mostrarPeliculasYSeries(filtradoPorCategoria);
        }
    */
    if (rutaActual.includes("serie")) {
        mostrarPeliculasOSeriesSegunRuta(filtradoPorCategoria, "serie"); //Si es serie pasamos el array y la palabra serie para ruta actual
    } else if (rutaActual.includes("pelicula")) {
        mostrarPeliculasOSeriesSegunRuta(filtradoPorCategoria, "pelicula"); //Si es serie pasamos el array la palabra pelicula para ruta actual
    } else if (rutaActual.includes("pantalla-principal")) {
        mostrarPeliculasYSeries(filtradoPorCategoria); //Si no es solo pelicula o solo serie mostramos todo
    }

});
