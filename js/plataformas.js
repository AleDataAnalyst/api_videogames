const apiKey = "eefbd8dac0b744f5b0cc9f499d593e49";
const baseUrl = "https://api.rawg.io/api/platforms";

// Función para buscar plataformas basadas en search query y número de página
async function fetchAndPrintPlatforms(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayPlatforms(data.results);
        } else {
            console.log('Error buscando plataformas:', response.status);
        }
    } catch (error) {
        console.error('Error buscando plataformas:', error);
    }
}

// Función para mostrar plataformas en una página
function displayPlatforms(platforms) {
    let platformCards = '';
    platforms.forEach(platform => {
        platformCards += `
            <div class="card mb-4 p-3" data-id="${platform.id}">
                <img src="${platform.image}" class="card-img" alt="${platform.name}">
                <div class="card-body">
                    <h5 class="card-title">${platform.name}</h5>
                    <p class="card-text">Juegos en plataforma: <span>${platform.games_count}</span></p>
                    <p class="card-text">Año de comienzo: <span class="start">${platform.year_start}</span> y final: <span>${platform.year_end}</span></p>
                </div>
            </div>`;
    });
    document.getElementById('platformsCards').innerHTML = platformCards;

    // Añadir event listener de clicks a tarjetas para abrir modal
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const platformId = card.dataset.id;
            openModal(platformId);
        });
    });
}

// Event listener para botón de búsqueda
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', () => {
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (searchTerm) {
        const searchUrl = `${baseUrl}?key=${apiKey}&search=${encodeURIComponent(searchTerm)}`;
        fetchAndPrintPlatforms(searchUrl);
    }
});

// Llamada inicial para cargar la primera página de plataformas
const initialUrl = `${baseUrl}?key=${apiKey}&dates=2020-01-01,2023-12-08&ordering=-added&page=1`;
fetchAndPrintPlatforms(initialUrl);

// Paginación
let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
    if (pagina < 1000) {
        pagina += 1;
        const paginationUrl = `${baseUrl}?key=${apiKey}&dates=2020-01-01,2023-12-08&ordering=-added&page=${pagina}`;
        fetchAndPrintPlatforms(paginationUrl);
    }
});

btnAnterior.addEventListener('click', () => {
    if (pagina > 1) {
        pagina -= 1;
        const paginationUrl = `${baseUrl}?key=${apiKey}&dates=2020-01-01,2023-12-08&ordering=-added&page=${pagina}`;
        fetchAndPrintPlatforms(paginationUrl);
    }
});