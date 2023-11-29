const { JSDOM } = require('jsdom');

const loaderEl = document.getElementById("#js-preloader");
const gameList = document.querySelector("#juegos");
const btnCargarMasJuegos = document.querySelector(".btn-cargarmas");
// url a games en doc por fechas
const urlGames = `https://api.rawg.io/api/games?key=${APIKEY}&dates=2023-01-01,2023-11-29&ordering=-added`;

console.log(urlGames, 'check');
