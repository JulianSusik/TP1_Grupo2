const SERIES_Y_PELICULAS = JSON.parse(localStorage.getItem("seriesYPeliculas"));
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const serie = SERIES_Y_PELICULAS.find(p => p.id == id);



function agregarIframe() {
    const nodeElement = document.querySelector(".video_detalle");//Contenedor del iframe
    const iframeElement = document.createElement("iframe");
    const botonVerElement = document.createElement("a");
    botonVerElement.innerHTML = "Comenzar";
    botonVerElement.className = "boton_ver";
    botonVerElement.target = "_blank";
    botonVerElement.href = serie.video.urlVideo;
    iframeElement.src = serie.video.iframe;
    nodeElement.appendChild(iframeElement);
    nodeElement.appendChild(botonVerElement);
}

function agregarTitulo() {
    const nodeElement = document.querySelector(".detalle_pelicula");
    const tituloElement = document.createElement("p");
    tituloElement.innerHTML = `<strong>Título:</strong> ${serie.nombre}`;
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

function agregarSinopsis(arrayDePeliculasYSeries){
    const nodeElement = document.querySelector(".detalle_pelicula");
    const sinopsisElement = document.createElement("p");
    sinopsisElement.innerHTML = `<strong>Sinopsis: </strong>${arrayDePeliculasYSeries.sinopsis}`;
    nodeElement.appendChild(sinopsisElement);
}


agregarIframe();
agregarTemporadasODuracion(serie);
agregarGenero(serie);
agregarActores(serie);
agregarSinopsis(serie);