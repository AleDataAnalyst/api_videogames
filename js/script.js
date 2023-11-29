// Acceder a los objetos de document y window desde la instancia JSDOM
const { JSDOM } = require('jsdom');
const fs = require('fs');

// Leer HTML
const html = fs.readFileSync("./index.html", 'utf-8');

// Crear instancia JSDOM con contenido HTML
const dom = new JSDOM(html);

// Acceder a los objetos document y window desde la instancia JSDOM
const document = dom.window.document;
const window = dom.window;

// Acceder a las variables globales como apiKey
const apiKey = window.apiKey; // Ajustar acorde a la variable global


const loaderEl = document.getElementById("#js-preloader");
const gameList = document.querySelector("#juegos");
const btnCargarMasJuegos = document.querySelector(".btn-cargarmas");
// url a games en doc por fechas
const urlGames = `https://api.rawg.io/api/games?key=${apiKey}&dates=2023-01-01,2023-11-29&ordering=-added`;

console.log(urlGames, 'check');
