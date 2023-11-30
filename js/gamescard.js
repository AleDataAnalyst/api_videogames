function printGames(data) {
    for (let i in data) {
        let content = document.getElementById('gamesCards');
        content.innerHTML +=
            `<div class="card mb-4 p-3">
                <img src="${data[i].background_image}" class="card-img" alt="Juego">
                <div class="card-body">
                    <h5 class="card-title">${data[i].name}</h5>
                    <p class="card-text">${getGenres(data[i].genres)}</p>
                    <p class="card-text">${getRatings(data[i].ratings)}</p>
                    <p class="card-text">${data[i].description}</p>
                    <p class="card-text">${data[i].released}</p>
                    <a href="${data[i].website}" class="btn btn-primary text-center">${data[i].website}</a>
                </div>
            </div>`;
    }
}

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

const apiKey = "eefbd8dac0b744f5b0cc9f499d593e49"; 
const urlGames = `https://api.rawg.io/api/games?key=${apiKey}&dates=2023-01-01,2023-11-29&ordering=-added`;

console.log('Comprobación antes de fetch');
fetch(urlGames)
    .then(response => {
        if (!response.ok) {
            console.log('Comprobación después de fetch');
            throw new Error(`Error HTTP! Estado: ${response.status}`);
        }
        return response.json();
    })
    .then(juegosRecibidosJson => printGames(juegosRecibidosJson.results))
    .catch(error => console.error('Error al buscar juegos:', error));
