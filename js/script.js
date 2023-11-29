// Acceder a los objetos de document y window desde la instancia JSDOM
const { JSDOM } = require('jsdom');
const fs = require('fs');
const { apiKey } = require('./prod.env.js');

// Leer HTML
const html = fs.readFileSync("./index.html", 'utf-8');

// Crear instancia JSDOM con contenido HTML
const dom = new JSDOM(html);

// Acceder a los objetos document y window desde la instancia JSDOM
const document = dom.window.document;
const window = dom.window;

// Acceder a las variables globales como apiKey
const apiKey = window.apiKey; // Ajustar acorde a la variable global

console.log("Before getting element");
const loaderEl = document.getElementById("js-preloader");
console.log("After getting element");
const juegoListContainer = document.getElementById("juegos");

document.addEventListener('DOMContentLoaded', function () {
    // url a games en doc por fechas
    const urlGames = `https://api.rawg.io/api/games?key=${apiKey}&dates=2023-01-01,2023-11-29&ordering=-added`;

    // Realizar la solicitud a la API
    fetch(urlGames)
        .then(response => response.json())
        .then(data => {
            // Procesar la respuesta y mostrar los juegos
            const juegos = data.results;
            console.log('Data:', data);
            // Check if data has results property
            if (data.results) {
                const juegos = data.results;
                juegos.forEach(juego => {
                    // Crear un nuevo elemento div para la tarjeta de Bootstrap
                    const cardElement = document.createElement("div");
                    cardElement.classList.add("card", "m-2", "shadow");

                    // Crear el contenido de la tarjeta (puedes personalizar esto según tus necesidades)
                    const cardContent = `
                    <img src="${juego.background_image}" class="card-img-top" alt="${juego.name}">
                    <div class="card-body">
                        <h5 class="card-title">${juego.name}</h5>
                        <p class="card-text">${juego.description}</p>
                        <a href="#" class="btn btn-primary">Ver detalles</a>
                    </div>
                    `;

                    // Asignar el contenido HTML a la tarjeta
                    cardElement.innerHTML = cardContent;

                    // Agregar la tarjeta al contenedor de juegos
                    juegoListContainer.appendChild(cardElement);
                });
            }
        })
        .catch(error => console.error('Error al cargar juegos:', error));
});
