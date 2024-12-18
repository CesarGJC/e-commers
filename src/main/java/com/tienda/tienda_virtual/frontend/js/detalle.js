const API_URL = 'http://localhost:8080/api';

// Obtener el ID del producto desde la URL
const params = new URLSearchParams(window.location.search);
const productoId = params.get('id');

// Cargar los detalles del producto
document.addEventListener('DOMContentLoaded', () => {
    if (productoId) {
        fetch(`${API_URL}/productos/${productoId}`)
            .then(response => response.json())
            .then(producto => {
                const contenedor = document.getElementById('detalle-producto');
                contenedor.innerHTML = `
                    <div class="producto-detalle">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                        <h2>${producto.nombre}</h2>
                        <p>${producto.descripcion}</p>
                        <p>Precio: $${producto.precio}</p>
                        <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
                    </div>
                `;
            })
            .catch(error => console.error('Error al cargar el producto:', error));
    } else {
        alert('No se encontró el producto.');
    }
});

// Función para agregar al carrito
const agregarAlCarrito = (productoId) => {
    const usuarioId = 1; // Reemplazar con el ID del usuario autenticado
    const carritoItem = {
        usuario: { id: usuarioId },
        producto: { id: productoId },
        cantidad: 1
    };

    fetch(`${API_URL}/carrito`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carritoItem)
    })
        .then(response => {
            if (response.ok) {
                alert('Producto agregado al carrito.');
            } else {
                alert('Error al agregar el producto.');
            }
        })
        .catch(error => console.error('Error al agregar al carrito:', error));
};
