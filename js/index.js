const apiKey = "eefbd8dac0b744f5b0cc9f499d593e49";

// Paginación
let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
    if (pagina < 1000) {
        pagina += 1;
        cargarJuegos();
    }
});

btnAnterior.addEventListener('click', () => {
    if (pagina > 1) {
        pagina -= 1;
        cargarJuegos();
    }
});

// Géneros
function getGenres(genres) {
    // Revisar si es array
    if (Array.isArray(genres)) {
        // Extraer nombres de género y unirlos en un string
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

// Función Cargar Juegos
const cargarJuegos = async () => {
    try {
        const respuesta = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&dates=2020-01-01,2023-12-08&ordering=-added&page=${pagina}`);

        if (respuesta.ok) {
            const datos = await respuesta.json();

            let juegos = '';
            datos.results.forEach(juegoData => {
                juegos += `
                    <div class="card mb-4 p-3" data-id="${juegoData.id}">
                        <img src="${juegoData.background_image}" class="card-img" alt="${juegoData.name}">
                        <div class="card-body">
                            <h5 class="card-title">${juegoData.name}</h5>
                            <p class="card-text">Género: <span>${getGenres(juegoData.genres)}</span></p>
                            <p class="card-text">Calificación: <span>${getRatings(juegoData.ratings)}</span></p>
                            <p class="card-text">Lanzamiento: <span>${juegoData.released}</span></p>
                        </div>
                    </div>`;
            });

            // Agregar el contenido al contenedor en tu HTML
            document.getElementById('gamesCards').innerHTML = juegos;
        } else if (respuesta.status === 401) {
            console.log('API Key incorrecta');
        } else if (respuesta.status === 404) {
            console.log('El videojuego que buscas no existe');
        } else {
            console.log('Hubo un error desconocido');
        }
    } catch (error) {
        console.log(error);
    }
};


// Llamada inicial para cargar la primera página
cargarJuegos();

// Modal descripción individual
// Añadir event listener para clicks de tarjeta
document.getElementById('gamesCards').addEventListener('click', (event) => {
    const card = event.target.closest('.card');
    if (card) {
        const gameId = card.dataset.id;
        if (gameId) {
            event.preventDefault();
            openModal(gameId);
        }
    }
});

// Funcción fetch y para mostrar información detallada en un modal
async function openModal(gameId) {
    try {
        const urlGameDetails = `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`;

        // Fetch detalles de juegos
        const responseDetails = await fetch(urlGameDetails);
        if (!responseDetails.ok) {
            throw new Error(`HTTP Error! Status: ${responseDetails.status}`);
        }
        const gameDetails = await responseDetails.json();

        // Crear contenido del modal
        const modalContent = `
            <div class="modal fade" id="gameModal" tabindex="-1" aria-labelledby="gameModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="gameModalLabel">${gameDetails.name}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>${gameDetails.description}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <a href="${gameDetails.website}" class="btn btn-primary" target="_blank">Visit website</a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remover cualquier modal existente
        document.querySelectorAll('.modal').forEach(modal => modal.remove());

        // Añadir el contenido del modal al document body
        document.body.insertAdjacentHTML('beforeend', modalContent);

        // Mostrar el modal
        const modal = new bootstrap.Modal(document.getElementById('gameModal'));
        modal.show();
    } catch (error) {
        console.error('Error buscando detalles de juegos', error);
    }
}

// Buscador
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        // Borrar resultados anteriores
        document.getElementById('gamesCards').innerHTML = '';

        // Usar el parámetro search en la API URL
        const urlWithSearch = `${urlGames}&search=${encodeURIComponent(searchTerm)}`;

        // Fetch y mostrado de juegos con la URL actualizada
        fetchAndPrintGames(urlWithSearch);
    }
});