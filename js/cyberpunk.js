document.addEventListener('DOMContentLoaded', function () {
    const apiKey = "eefbd8dac0b744f5b0cc9f499d593e49";

    // Función fetch para buscar juegos y actualizar HTML
    async function fetchGameDetails(gameId) {
        try {
            const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`);
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            const gameData = await response.json();

            // Actualizar imagen
            const gameImage = document.getElementById('juego_img');
            gameImage.src = gameData.background_image;
            gameImage.alt = gameData.name;

            // Actualizar detalles de juego
            const gameDetailsContainer = document.querySelector('.datos_juego');
            gameDetailsContainer.innerHTML = `
                <h2>${gameData.name}</h2>
                <p>${gameData.description}</p>
                <p>Lanzamiento: ${gameData.released}</p>
                <p>Rating: ${gameData.rating}</p>
                <p>ESRB Rating: ${gameData.esrb_rating.name}</p>
            `;
        } catch (error) {
            console.error('Error buscando detalles del juego:', error);
        }
    }

    // Detalles para hacer fetch del primer juego (se asume que es "Cyberpunk")
    fetchGameDetails(0);
});