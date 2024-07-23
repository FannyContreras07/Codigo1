// Endpoint base para la API de GitHub
const baseEndpoint = 'https://api.github.com';
// Endpoint específico para usuarios
const usersEndpoint = `${baseEndpoint}/users`;

// Usar selectores de clase para coincidir con el HTML proporcionado
const $n = document.querySelector('.name'); // Cambiado a selector de clase
const $b = document.querySelector('.blog'); // Cambiado a selector de clase
const $l = document.querySelector('.location'); // Asegúrate de que exista este elemento en tu HTML

// Declarar la función como asíncrona
async function displayUser(username) {
  try {
    $n.textContent = 'Cargando...';
    // Esperar a que la promesa fetch se resuelva
    const response = await fetch(`${usersEndpoint}/${username}`);
    
    // Manejo de errores de respuesta HTTP
    if (!response.ok) {
      throw new Error('No se pudo obtener la información del usuario');
    }
    
    // Convertir la respuesta a JSON
    const data = await response.json();
    console.log(data);

    // Usar comillas invertidas para la interpolación de strings
    $n.textContent = `${data.name || 'Nombre no disponible'}`;
    $b.textContent = `${data.blog || 'Blog no disponible'}`;
    // Asegúrate de añadir un elemento con la clase "location" si planeas mostrarlo
    if ($l) {
      $l.textContent = `${data.location || 'Ubicación no disponible'}`;
    }
  } catch (err) {
    // Llamar a la función de manejo de errores
    handleError(err);
  }
}

// Función para manejar errores
function handleError(err) {
  console.log('OH NO!');
  console.log(err);
  // Corregir el uso de n.textContent por $n.textContent
  $n.textContent = `Algo salió mal: ${err.message}`;
}

// Llamar a la función displayUser y manejar errores
displayUser('stolinski');
