// API RAWG
const apiKey = "eefbd8dac0b744f5b0cc9f499d593e49"; 
let pagina = 1;

const urlGames = `https://api.rawg.io/api/games?key=${apiKey}&dates=2020-01-01,2023-12-08&ordering=-added&page=${pagina}`;

// Paginación
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
    // Verificar que haya más resultados antes de incrementar la página
    if (pagina < 10000 && pagina * 20 < totalResults) {
        pagina += 1;
        fetchAndPrintGames();
    }
});

btnAnterior.addEventListener('click', () => {
    if (pagina > 1) {
        pagina -= 1;
        fetchAndPrintGames();
    }
});

// Función para obtener datos de la API y mostrar juegos
let totalResults;

function fetchAndPrintGames() {
    fetch(urlGames)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP! Estado: ${response.status}`);
            }
            return response.json();
        })
        .then(juegosRecibidosJson => {
            // Guardar el total de resultados
            totalResults = juegosRecibidosJson.count;
            // Limpiar contenido antes de agregar nuevos juegos
            document.getElementById('gamesCards').innerHTML = '';
            printGames(juegosRecibidosJson.results);
        })
        .catch(error => console.error('Error al buscar juegos:', error));
}

// Llamada inicial para cargar la primera página
fetchAndPrintGames();

// Imprimir Juegos
function printGames(data) {
    for (let i in data) {
        let content = document.getElementById('gamesCards');
        content.innerHTML +=
            `<div class="card mb-4 p-3">
                <img src="${data[i].background_image}" class="card-img" alt="Juego">
                <div class="card-body">
                    <h5 class="card-title">${data[i].name}</h5>
                    <p class="card-text">Género: <span>${getGenres(data[i].genres)}</span></p>
                    <p class="card-text">Calificación: <span>${getRatings(data[i].ratings)}</span></p>
                    <p class="card-text">Descripción: <span>${data[i].description}</span></p>
                    <p class="card-text">Fecha de lanzamiento: <span>${data[i].released}</span></p>
                    <p class="card-text">Sitio web: <span><a href="${data[i].website}" class="btn text-center">${data[i].website}</a></span></p>
                </div>
            </div>`;
    }
}

// Géneros
function getGenres(genres) {
    // Revisar si es array
    if (Array.isArray(genres)) {
        // Extracer nombres de género y unirlos en un string
        return `${genres.map(genre => genre.name).join(', ')}`;
    } else {
        // Retornar valor por defecto si genres no es array
        return 'N/A';
    }
}

// Ratings
function getRatings(ratings) {
    // Revisar si es array
    if (Array.isArray(ratings) && ratings.length > 0) {
        // Extraer valores de rating y unirlos en string
        return `${ratings.map(rating => rating.title).join(', ')}`;
    } else {
        // Retornar valor por defecto si ratings no es array o está vacío
        return 'N/A';
    }
}

console.log('Comprobación antes de fetch');
// fetch(urlGames)
//     .then(response => {
//         if (!response.ok) {
//             console.log('Comprobación después de fetch');
//             throw new Error(`Error HTTP! Estado: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(juegosRecibidosJson => printGames(juegosRecibidosJson.results))
//     .catch(error => console.error('Error al buscar juegos:', error));
