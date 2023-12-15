// Array de sadCoders
const sadCoders = [
    { nombre: 'Coder1', atributo: '' },
    { nombre: 'Coder2', atributo: '' },
    { nombre: 'Coder3', atributo: '' },
    // Agregar más sadCoders según sea necesario
  ];
  
  // Función para aleatorizar los atributos positivos
  function obtenerAtributoPositivo() {
    const atributosPositivos = ['apoyo', 'comprensión', 'amor', 'paciencia', 'tutoría', 'koala y bambú', 'lección coder', 'píldora', 'felicidad', 'entorno protector'];
    const indiceAleatorio = Math.floor(Math.random() * atributosPositivos.length);
    return atributosPositivos[indiceAleatorio];
  }
  
  // Bucle forEach para asignar atributos positivos a los sadCoders
  sadCoders.forEach(coder => {
    coder.atributo = obtenerAtributoPositivo();
    console.log(`${coder.nombre} no está solx y recibe: ${coder.atributo} de su clase y de Factoría F5`);
  });
  
  // Muestra los resultados
  console.log('¡Ya no existen sadCoders y comparten felicidad grupal!');
  console.log(sadCoders);
  