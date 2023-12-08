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

const apiKey = "eefbd8dac0b744f5b0cc9f499d593e49";

const cargarJuegos = async () => {
    try {
        const respuesta = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&dates=2020-01-01,2023-12-08&ordering=-added&page=${pagina}`);
        
        if (respuesta.ok) {
            const datos = await respuesta.json();
            
            let juegos = '';
            datos.results.forEach(juego => {
                juegos += `
                    <div class="card mb-4 p-3">
                        <img src="${juego.background_image}" class="card-img" alt="${juego.name}">
                        <div class="card-body">
                            <h5 class="card-title">${juego.name}</h5>
                            <p class="card-text">Género: <span>${getGenres(juego.genres)}</span></p>
                            <p class="card-text">Calificación: <span>${getRatings(juego.ratings)}</span></p>
                            <p class="card-text">Descripción: <span>${juego.description}</span></p>
                            <p class="card-text">Fecha de lanzamiento: <span>${juego.released}</span></p>
                            <p class="card-text">Sitio web: <span><a href="${juego.website}" class="btn text-center">${juego.website}</a></span></p>
                        </div>
                    </div>`;
            });
            
            // Ahora, necesitas agregar el contenido al contenedor en tu HTML
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
