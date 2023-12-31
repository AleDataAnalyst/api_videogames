Explicación del consumo de API RAWG:
El código juegos.js utiliza la API de Rawg para mostrar juegos, permitir la paginación, filtrar por género, mostrar calificaciones y lanzamientos, y abrir un modal con detalles adicionales cuando se hace clic en un juego.

API RAWG:
* count: el número total de juegos en la respuesta. En este caso es 0.
* next: la URL de la siguiente página de resultados. En su ejemplo, es "http://example.com". Si hay más resultados, puede utilizar esta URL para recuperarlos.
* previous: la URL de la página anterior de resultados. Al igual que a continuación, puede utilizar esta URL para navegar a la página anterior de resultados.
* results: una matriz que contiene los detalles de juegos individuales. Cada objeto del juego tiene varias propiedades, que incluyen:
* id: El identificador único del juego.
* slug: un identificador de cadena para el juego.
* name: El nombre del juego.
* released: la fecha de lanzamiento del juego.
* tba: un valor booleano que indica si la fecha de lanzamiento está "por anunciar".
* background_image: la URL de la imagen de fondo del juego.
* rating: La clasificación del juego.
* rating_top: La calificación más alta del juego.
* ratings: Información adicional sobre calificaciones.
* ratings_count: el recuento de calificaciones.
* reviews_text_count: el recuento de reseñas textuales.
* added: el recuento de usuarios que agregaron el juego.
* added_by_status: información adicional sobre los usuarios que agregaron el juego.
* metacritic: La puntuación Metacritic del juego.
* playtime: El tiempo de juego estimado del juego.
* suggestions_count: el recuento de sugerencias para el juego.
* updated: la marca de tiempo en la que se actualizó por última vez la información del juego.
* esrb_rating: clasificación de la Junta de clasificación de software de entretenimiento (ESRB), que incluye identificación, slug y nombre.
* platforms: una matriz que contiene información de la plataforma para el juego, que incluye:
* platform: información sobre la plataforma, incluida la identificación, el slug y el nombre.
* released_at: la fecha de lanzamiento del juego en la plataforma específica.
* requirements: Requisitos mínimos y recomendados para el juego en la plataforma específica.
