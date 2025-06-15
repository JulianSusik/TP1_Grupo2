const SERIES_Y_PELICULAS = JSON.parse(localStorage.getItem("seriesYPeliculas"));
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const objetoVisual = SERIES_Y_PELICULAS.find(p => p.id == id);
//objeto visual es un objeto donde se guarda el objeto buscado por el id en la url


function agregarIframe() {
    const nodeElement = document.querySelector(".video_detalle");//Contenedor del iframe
    const iframeElement = document.createElement("iframe");
    const botonVerElement = document.createElement("a");
    botonVerElement.innerHTML = "Comenzar";
    botonVerElement.className = "boton_ver";
    botonVerElement.target = "_blank";
    botonVerElement.href = objetoVisual.video.urlVideo;
    iframeElement.src = objetoVisual.video.iframe;
    nodeElement.appendChild(iframeElement);
    nodeElement.appendChild(botonVerElement);
}

function agregarTitulo() {
    const nodeElement = document.querySelector(".detalle_pelicula");
    const tituloElement = document.createElement("p");
    tituloElement.innerHTML = `<strong>Título:</strong> ${objetoVisual.nombre}`;
    nodeElement.appendChild(tituloElement);
};

function agregarTemporadasODuracion(arrayDePeliculasYSeries) {
    agregarTitulo();
    const nodeElement = document.querySelector(".detalle_pelicula");
    if (arrayDePeliculasYSeries.tipo == 'serie') {
        const divElement = document.createElement("div");
        divElement.className = "temporadaYCapitulos";
        nodeElement.appendChild(divElement);
        const temporadaElement = document.createElement("p");
        temporadaElement.innerHTML = "<strong>Temporada: </strong>"

        const selectorElement = document.createElement("select");
        selectorElement.id = "temporadaSelector";
        for (let index = 1; index <= arrayDePeliculasYSeries.temporadas.length; index++) {
            const optionElement = document.createElement("option");
            optionElement.value = index;
            optionElement.textContent = index;
            selectorElement.appendChild(optionElement);
        }
        temporadaElement.appendChild(selectorElement);
        divElement.appendChild(temporadaElement);
        //Codigo que se ejecuta para crear las temporadas y los capitulos de las series
        //Capitulos
        const capituloElement = document.createElement("p");
        capituloElement.innerHTML = "<strong>Capitulo: </strong>";
        const selectorSegundoElement = document.createElement("select");
        selectorSegundoElement.id = "capitulosSelector";
        let numeroDeCapitulos = arrayDePeliculasYSeries.temporadas[0].capitulos;

        for (let index = 1; index <= numeroDeCapitulos; index++) {
            const optionElement = document.createElement("option");
            optionElement.value = index;
            optionElement.innerHTML = index;
            selectorSegundoElement.appendChild(optionElement);
        }
        capituloElement.appendChild(selectorSegundoElement);
        divElement.appendChild(capituloElement);

        selectorElement.addEventListener("change", event => {
            const temporadaSeleccionada = parseInt(selectorElement.value);
            const numeroDeCapitulos = arrayDePeliculasYSeries.temporadas[temporadaSeleccionada - 1].capitulos; //Se le resta uno porque el array empieza en 0
            selectorSegundoElement.innerHTML = "";//Limpia los capitulos para poder agregar los nuevos
            for (let index = 1; index <= numeroDeCapitulos; index++) {
                const nuevosCapitulos = document.createElement("option");
                nuevosCapitulos.value = index;
                nuevosCapitulos.innerHTML = index;
                selectorSegundoElement.appendChild(nuevosCapitulos);
            }
        }
        )

    } else {
        //Codigo que se ejecutra para crear las peliculas con su duracion
        const duracionElement = document.createElement("p");
        duracionElement.innerHTML = `<strong>Duración: </strong>${arrayDePeliculasYSeries.duracion}`;
        nodeElement.appendChild(duracionElement);

    }

};

function agregarGenero(arrayDePeliculasYSeries) {
    const nodeElement = document.querySelector(".detalle_pelicula");
    const generoElement = document.createElement("p");
    generoElement.innerHTML = `<strong>Género: </strong>${arrayDePeliculasYSeries.genero}`;
    nodeElement.appendChild(generoElement);
}

function agregarActores(arrayDePeliculasYSeries) {
    const nodeElement = document.querySelector(".detalle_pelicula");
    const contenedorActores = document.createElement("p");
    contenedorActores.innerHTML = "<strong>Actores: </strong>";

    for (let i = 0; i < arrayDePeliculasYSeries.actores.length; i++) {
        const actorObj = arrayDePeliculasYSeries.actores[i]; //Traemos el objeto con el parametro actor y wiki, para separarlos
        const actorLink = document.createElement("a");
        actorLink.className = "linkActores";//Le damos una clase para en css poder acomodarlo mejor
        actorLink.href = actorObj.wiki; //url a la wiki
        actorLink.target = "_blank";
        actorLink.innerHTML = `${actorObj.actor}`;//Mostramos nombre de actor
        contenedorActores.appendChild(actorLink);
        if (i !== arrayDePeliculasYSeries.actores.length - 1) {
            contenedorActores.append(", ");//Si el tamaño es distinto al ultimo actor, agregamos coma para separar los nombres
        }
    }

    nodeElement.appendChild(contenedorActores);
}

function agregarSinopsis(arrayDePeliculasYSeries) {
    const nodeElement = document.querySelector(".detalle_pelicula");
    const sinopsisElement = document.createElement("p");
    sinopsisElement.innerHTML = `<strong>Sinopsis: </strong>${arrayDePeliculasYSeries.sinopsis}`;
    nodeElement.appendChild(sinopsisElement);
}
/*
document.addEventListener("DOMContentLoaded", function () {//Esto hace que cuando se carge por completo el html se ejecute la funcion del parametro
    const carruselElement = document.getElementById("carrusel");
    let index = 0;
    carruselELement.innerHTML = "";
    function renderCarrusel() {



        SERIES_Y_PELICULAS.forEach((serieOPelicula, i) => {
            const slideCarrusel = document.createElement("div");
            slideCarrusel.classList.add("slide");
            if (i === index) {
                const imagenCarrusel = document.createElement("img");
                imagenCarrusel.src = SERIES_Y_PELICULAS[index].imagen.url;
                imagenCarrusel.alt = SERIES_Y_PELICULAS[index].imagen.alt;
                slideCarrusel.appendChild(imagenCarrusel);
                carruselElement.appendChild(slideCarrusel);
            }
        });
        
    }

    function mostrarSiguiente() {
        index = (index + 1) % SERIES_Y_PELICULAS.length;
        renderCarrusel();
    }
    function mostrarAnterior() {
        index = (index - 1 + SERIES_Y_PELICULAS.length) % SERIES_Y_PELICULAS.length;
        renderCarrusel();
    }

    document.getElementById("prev").addEventListener("click", mostrarAnterior);
    document.getElementById("next").addEventListener("click", mostrarSiguiente);



});
*/
document.addEventListener("DOMContentLoaded", function () {
    const carruselElement = document.getElementById("carrusel");
    let index = 0;
    
    // Cargar todos los slides al iniciar
    SERIES_Y_PELICULAS.forEach((serieOPelicula, i) => {
        const slideCarrusel = document.createElement("div");
        slideCarrusel.classList.add("slide");
        if (i == 0) {
            slideCarrusel.classList.add("activo");
        }
        const imagenElement = document.createElement("img");
        imagenElement.src = serieOPelicula.imagen.url;
        imagenElement.alt = serieOPelicula.imagen.alt;
        slideCarrusel.appendChild(imagenElement);
        carruselElement.appendChild(slideCarrusel); //Cargamos todas las imagenes en los div una sobre otra pero con opacidad 0
        //Menos la primera, entonces la unica que tiene opacidad 1 es la que se esta mostrando
    });
    
    const slides = document.querySelectorAll(".slide");//Llamamos a todos los elementos .slide para modificarlos segun el for each indique
    function actualizarCarrusel() {
        slides.forEach((slide, i) => {
            slide.classList.toggle("activo", i === index); //Cuando el foreach este posicionado en la imagen i, se cambia a este div como activo
            //Entonces se le saca la opacidad y se muestra con la transicion
        });
    }

    function mostrarSiguiente() {
        index = (index + 1) % SERIES_Y_PELICULAS.length;
        actualizarCarrusel();
    }

    function mostrarAnterior() {
        index = (index - 1 + SERIES_Y_PELICULAS.length) % SERIES_Y_PELICULAS.length;
        actualizarCarrusel();
    }

    document.getElementById("prev").addEventListener("click", mostrarAnterior);
    document.getElementById("next").addEventListener("click", mostrarSiguiente);
});





agregarIframe();
agregarTemporadasODuracion(objetoVisual);
agregarGenero(objetoVisual);
agregarActores(objetoVisual);
agregarSinopsis(objetoVisual);