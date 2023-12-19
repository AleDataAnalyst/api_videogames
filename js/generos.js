const apiKey = "eefbd8dac0b744f5b0cc9f499d593e49";

// Paginación
let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
    if (pagina < 1000) {
        pagina += 1;
        cargarGeneros();
    }
});

btnAnterior.addEventListener('click', () => {
    if (pagina > 1) {
        pagina -= 1;
        cargarGeneros();
    }
});

// Función Cargar Géneros
const cargarGeneros = async () => {
  try {
    const respuesta = await fetch(`https://api.rawg.io/api/genres?key=${apiKey}`);

    if (respuesta.ok) {
      const datos = await respuesta.json();

      let genres = '';
      datos.results.forEach(genreData => {
        genres += `
          <div class="card mb-4 p-3" data-id="${genreData.id}">
              <img src="${genreData.image_background}" class="card-img" alt="${genreData.name}">
              <div class="card-body">
                  <h5 class="card-title">Género: <span>${genreData.name}</span></h5>
                  <p class="card-text">Juegos del género: <span>${genreData.games_count}</span></p>
              </div>
          </div>`;
      });

      // Agregar el contenido al contenedor en tu HTML
      document.getElementById('gamesCards').innerHTML = genres;
    } else {
      console.log('Hubo un error al cargar los géneros');
    }
  } catch (error) {
    console.log('Error al cargar los géneros:', error);
  }
};

// Llamada inicial para cargar la lista de géneros
cargarGeneros();