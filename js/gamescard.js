function printGames(data) { // parámetro datos para acceder a datos
    for(let i in data) {
        let content = document.getElementById('gamesCards')
        content.innerHTML +=
        // insertar entre backticks el bloque de código de la tarjeta para juegos para que sea dinámica
        `<div class="card sm-2 md-4">
            <img src="${data[i].background_image}" class="card-img" alt="Juego">
            <div class="card-body">
                <h5 class="card-title">${data[i].name}</h5>
                <p class="card-text">${data[i].genre}€</p>
                <p class="card-text">${data[i].ratings}€</p>
                <p class="card-text">${data[i].description}€</p>
                <p class="card-text">${data[i].released}€</p>
                <a href="${data[i].website}" class="btn btn-primary text-center">${data[i].website}€</a>
            </div>
        </div>`
    }    
}

fetch('games.json')
.then(response => response.json())
.then(juegosRecibidosJson => printGames(juegosRecibidosJson.games))