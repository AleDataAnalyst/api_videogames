const apiKey = 'eefbd8dac0b744f5b0cc9f499d593e49';

// Función para obtener información de plataformas
function obtenerPlataformas() {
    const url = `https://api.rawg.io/api/platforms?key=${apiKey}`;

    $.get(url, function (data) {
        mostrarDatos('plataformas', data);
    });
}

// Función para obtener información de juegos
function obtenerJuegos() {
    const fechas = '2019-09-01,2019-09-30';
    const plataformas = [18, 1, 7];
    const url = `https://api.rawg.io/api/games?key=${apiKey}&dates=${fechas}&platforms=${plataformas.join(',')}`;

    $.get(url, function (data) {
        mostrarDatos('juegos', data);
    });
}

// Función para mostrar datos en el HTML
function mostrarDatos(id, data) {
    const container = document.getElementById(id);

    if (data && data.results) {
        container.innerHTML = '<pre>' + JSON.stringify(data.results, null, 2) + '</pre>';
    } else {
        container.innerHTML = '<p>Error al obtener datos.</p>';
    }
}

// Llamadas a las funciones para obtener datos al cargar la página
$(document).ready(function () {
    obtenerPlataformas();
    obtenerJuegos();
});
