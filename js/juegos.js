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

// Función para fetch y mostrar información detallada en un modal
async function openModal(gameId) {
    try {
        const urlGameDetails = `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`;
    
        // Fetch game details
        const responseDetails = await fetch(urlGameDetails);
        if (!responseDetails.ok) {
            throw new Error(`Error HTTP! Estado: ${responseDetails.status}`);
        }
        const gameDetails = await responseDetails.json();

        // Mostrar game details en modal
        const modalContent = `
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header px-4">
                            <h3 class="modal-title fs-5" id="exampleModalLabel">${gameDetails.name}</h3>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body px-4">
                            <p>${gameDetails.description}</p>
                        </div>
                        <div class="modal-footer px-4">
                            <button type="button" class="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" id="btn-web" class="btn btn-primary rounded-pill">
                            <a href="${gameDetails.website}" class="btn text-center" target="_blank">Visitar web</a></button>

                        </div>
                    </div>
                </div>
            </div>
        `;

        // Añadir el contenido modal content al document body
        document.body.insertAdjacentHTML('beforeend', modalContent);

        // Inicializar el modal usando métodos Bootstrap modal
        const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
        modal.show();
    } catch (error) {
        console.error('Error al buscar los detalles del juego:', error);
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