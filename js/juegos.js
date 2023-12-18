const apiKey = "eefbd8dac0b744f5b0cc9f499d593e49";
const baseUrl = "https://api.rawg.io/api/games";

// Función para buscar juegos basados en search query y número de página
async function fetchAndPrintGames(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayGames(data.results);
        } else {
            console.log('Error buscando juegos:', response.status);
        }
    } catch (error) {
        console.error('Error buscando juegos:', error);
    }
}

// Función para mostrar juegos en una página
function displayGames(games) {
    let gamesHtml = '';
    games.forEach(game => {
        gamesHtml += `
            <div class="card mb-4 p-3" data-id="${game.id}">
                <img src="${game.background_image}" class="card-img" alt="${game.name}">
                <div class="card-body">
                    <h5 class="card-title">${game.name}</h5>
                    <p class="card-text">Género: <span>${getGenres(game.genres)}</span></p>
                    <p class="card-text">Calificación: <li><i class="fa fa-star"></i></li><span class="rating">${getRatings(game.ratings)}</span></li>
                    <p class="card-text">Lanzamiento: <span>${game.released}</span></p>
                </div>
            </div>`;
    });
    document.getElementById('gamesCards').innerHTML = gamesHtml;

    // Añadir event listener para clicks en tarjetas para abrir modal
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const gameId = card.dataset.id;
            openModal(gameId);
        });
    });
}

// Event listener para botón de búsqueda
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', () => {
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (searchTerm) {
        const searchUrl = `${baseUrl}?key=${apiKey}&search=${encodeURIComponent(searchTerm)}`;
        fetchAndPrintGames(searchUrl);
    }
});

// Llamada inicial para cargar la primera página de juegos
const initialUrl = `${baseUrl}?key=${apiKey}&dates=2020-01-01,2023-12-08&ordering=-added&page=1`;
fetchAndPrintGames(initialUrl);

// Paginación
let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
    if (pagina < 1000) {
        pagina += 1;
        const paginationUrl = `${baseUrl}?key=${apiKey}&dates=2020-01-01,2023-12-08&ordering=-added&page=${pagina}`;
        fetchAndPrintGames(paginationUrl);
    }
});

btnAnterior.addEventListener('click', () => {
    if (pagina > 1) {
        pagina -= 1;
        const paginationUrl = `${baseUrl}?key=${apiKey}&dates=2020-01-01,2023-12-08&ordering=-added&page=${pagina}`;
        fetchAndPrintGames(paginationUrl);
    }
});

// Géneros
function getGenres(genres) {
    if (Array.isArray(genres)) {
        return `${genres.map(genre => genre.name).join(', ')}`;
    } else {
        return 'N/A';
    }
}

// Ratings
function getRatings(ratings) {
    if (Array.isArray(ratings) && ratings.length > 0) {
        return `${ratings.map(rating => rating.title).join(', ')}`;
    } else {
        return 'N/A';
    }
}

// Función para buscar detalles de juegos
async function fetchGameDetails(gameId) {
    const urlGameDetails = `${baseUrl}/${gameId}?key=${apiKey}`;
    try {
        const responseDetails = await fetch(urlGameDetails);
        if (!responseDetails.ok) {
            throw new Error(`Error HTTP! Estado: ${responseDetails.status}`);
        }
        return await responseDetails.json();
    } catch (error) {
        console.error('Error buscando detalles de juegos:', error);
    }
}

// Función para crear y mostrar modal
async function openModal(gameId) {
    try {
        const gameDetails = await fetchGameDetails(gameId);
        const modalContent = createModalContent(gameDetails);
        appendModalContentToBody(modalContent);
        initializeAndShowModal(gameId);
    } catch (error) {
        console.error('Error al buscar los detalles del juego:', error);
    }
}

// Función para crear contenido de modal
function createModalContent(gameDetails) {
    return `
        <div class="modal fade" id="exampleModal-${gameDetails.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <a href="${gameDetails.website}" class="btn text-center" target="_blank">Visitar web</a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Función para añadir contenido de modal al body
function appendModalContentToBody(modalContent) {
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

// Función para inicializar y mostrar modal
function initializeAndShowModal(gameId) {
    const modal = new bootstrap.Modal(document.getElementById(`exampleModal-${gameId}`));
    modal.show();
}