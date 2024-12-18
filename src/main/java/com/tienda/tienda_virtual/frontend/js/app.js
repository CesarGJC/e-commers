const API_URL = 'http://localhost:8080/api'; // URL base del backend

// Cargar productos destacados en la página principal
document.addEventListener('DOMContentLoaded', () => {
    fetch(`${API_URL}/productos`)
        .then(response => response.json())
        .then(data => {
            const contenedor = document.getElementById('productos-destacados');
            contenedor.innerHTML = data.slice(0, 4).map(producto => `
                <div class="producto">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <h3>${producto.nombre}</h3>
                    <p>Precio: $${producto.precio}</p>
                </div>
            `).join('');
        })
        .catch(error => console.error('Error cargando productos:', error));
});
// Verificar si el usuario está autenticado
const verificarAutenticacion = () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario) {
        alert('Por favor, inicia sesión.');
        window.location.href = 'login.html';
    }
};

// Ejemplo de uso en una vista protegida:
if (window.location.pathname.includes('carrito.html')) {
    verificarAutenticacion();
}

