const apiKey = "eefbd8dac0b744f5b0cc9f499d593e49";
const baseUrl = "https://api.rawg.io/api/creators";

// Función buscar creadores
async function fetchAndPrintCreators(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayCreators(data.results);
        } else {
            console.log('Error buscando creadores:', response.status);
        }
    } catch (error) {
        console.error('Error buscando creadores:', error);
    }
}

// Función para mostrar creadores
function displayCreators(creators) {
    let creatorsHtml = '';
    creators.forEach(creator => {
        creatorsHtml += `
            <div class="creator">
                <h4>${creator.name}</h4>
                <img src="${creator.image}" alt="${creator.name} class="rounded mx-auto d-block creator-img">
                <p>Juegos creados: ${creator.games_count}</p>
            </div>`;
    });
    document.getElementById('creatorsList').innerHTML = creatorsHtml;
}

// Llamada inicial para cargar la primera página de creadores
const initialUrl = `${baseUrl}?key=${apiKey}&page=1`;
fetchAndPrintCreators(initialUrl);

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

// Función para añadir contenido de modal al body
function appendModalContentToBody(modalContent) {
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

// Función para inicializar y mostrar modal
function initializeAndShowModal(creatorId) {
    const modal = new bootstrap.Modal(document.getElementById(`exampleModal-${creatorId}`));
    modal.show();
}