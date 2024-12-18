const API_URL = 'http://localhost:8080/api';

// Verificar rol del usuario
document.addEventListener('DOMContentLoaded', () => {
    verificarRol('administrador');
    cargarProductos();
});

// Crear o actualizar un producto
document.getElementById('producto-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const producto = {
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        precio: parseFloat(document.getElementById('precio').value),
        categoria: document.getElementById('categoria').value,
        imagen: document.getElementById('imagen').value
    };

    fetch(`${API_URL}/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
    })
        .then(() => {
            alert('Producto guardado.');
            cargarProductos();
        })
        .catch(error => console.error('Error al guardar el producto:', error));
});

// Cargar productos
const cargarProductos = () => {
    fetch(`${API_URL}/productos`)
        .then(response => response.json())
        .then(data => {
            const contenedor = document.getElementById('productos');
            contenedor.innerHTML = data.map(producto => `
                <div class="producto">
                    <h3>${producto.nombre}</h3>
                    <p>${producto.descripcion}</p>
                    <p>Precio: $${producto.precio}</p>
                    <p>Categoría: ${producto.categoria}</p>
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
                </div>
            `).join('');
        })
        .catch(error => console.error('Error al cargar los productos:', error));
};

// Eliminar producto
const eliminarProducto = (id) => {
    fetch(`${API_URL}/productos/${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            alert('Producto eliminado.');
            cargarProductos();
        })
        .catch(error => console.error('Error al eliminar el producto:', error));
};
