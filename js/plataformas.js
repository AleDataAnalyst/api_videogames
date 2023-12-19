const apiKey = "eefbd8dac0b744f5b0cc9f499d593e49";
const baseUrl = "https://api.rawg.io/api/platforms";

// Función para buscar juegos basados en search query y número de página
async function fetchAndPrintPlaftorms(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayPlaftorms(data.results);
        } else {
            console.log('Error buscando plataformas:', response.status);
        }
    } catch (error) {
        console.error('Error buscando plataformas:', error);
    }
}

// Función para mostrar plataformas en una página
function displayPlaftorms(plaftorms) {
    let plaftormsHtml = '';
    plaftorms.forEach(plaftorm => {
        PlaftormsHtml += `
            <div class="card mb-4 p-3" data-id="${plaftorm.id}">
                <img src="${plaftorm.image}" class="card-img" alt="${plaftorm.name}">
                <div class="card-body">
                    <h5 class="card-title">${plaftorm.name}</h5>
                    <p class="card-text">Conteo: <span>${getGamesCount(plaftorm.games_count)}</span></p>
                    <p class="card-text">Año de comienzo: <span class="start">${getStartYear(plaftorm.year_start)}</span> y fin: <span>${getStartYear(plaftorm.end)}</span></p>
                </div>
            </div>`;
    });
    document.getElementById('plaftormsCards').innerHTML = plaftormsHtml;

    // Añadir event listener para clicks en tarjetas para abrir modal
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const plaftormId = card.dataset.id;
            openModal(plaftormId);
        });
    });
}

// Event listener para botón de búsqueda
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', () => {
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (searchTerm) {
        const searchUrl = `${baseUrl}?key=${apiKey}&search=${encodeURIComponent(searchTerm)}`;
        fetchAndPrintplaftorms(searchUrl);
    }
});

// Llamada inicial para cargar la primera página de juegos
const initialUrl = `${baseUrl}?key=${apiKey}&dates=2020-01-01,2023-12-08&ordering=-added&page=1`;
fetchAndPrintplaftorms(initialUrl);

// Paginación
let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
    if (pagina < 1000) {
        pagina += 1;
        const paginationUrl = `${baseUrl}?key=${apiKey}&dates=2020-01-01,2023-12-08&ordering=-added&page=${pagina}`;
        fetchAndPrintPlaftorms(paginationUrl);
    }
});

btnAnterior.addEventListener('click', () => {
    if (pagina > 1) {
        pagina -= 1;
        const paginationUrl = `${baseUrl}?key=${apiKey}&dates=2020-01-01,2023-12-08&ordering=-added&page=${pagina}`;
        fetchAndPrintPlaftorms(paginationUrl);
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
async function fetchPlaftormDetails(plaftormId) {
    const urlPlaftormDetails = `${baseUrl}/${plaftormId}?key=${apiKey}`;
    try {
        const responseDetails = await fetch(urlPlaftormDetails);
        if (!responseDetails.ok) {
            throw new Error(`Error HTTP! Estado: ${responseDetails.status}`);
        }
        return await responseDetails.json();
    } catch (error) {
        console.error('Error buscando detalles de plataformas:', error);
    }
}

// Función para crear y mostrar modal
async function openModal(plaftormId) {
    try {
        const plaftormDetails = await fetchPlaftormDetails(plaftormId);
        const modalContent = createModalContent(plaftormDetails);
        appendModalContentToBody(modalContent);
        initializeAndShowModal(plaftormId);
    } catch (error) {
        console.error('Error al buscar los detalles de la plataforma:', error);
    }
}

// Función para crear contenido de modal
function createModalContent(plaftormDetails) {
    return `
        <div class="modal fade" id="exampleModal-${plaftormDetails.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header px-4">
                        <h3 class="modal-title fs-5" id="exampleModalLabel">${plaftormDetails.name}</h3>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body px-4">
                        <p>${plaftormDetails.description}</p>
                    </div>
                    <div class="modal-footer px-4">
                        <button type="button" class="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" id="btn-web" class="btn btn-primary rounded-pill">
                            <a href="${plaftormDetails.website}" class="btn text-center" target="_blank">Visitar web</a>
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
function initializeAndShowModal(plaftormId) {
    const modal = new bootstrap.Modal(document.getElementById(`exampleModal-${plaftormId}`));
    modal.show();
}