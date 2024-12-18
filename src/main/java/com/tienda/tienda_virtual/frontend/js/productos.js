document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:8080/api';
    const contenedor = document.getElementById('listado-productos');
    const filtroCategoria = document.getElementById('categoria');

    // Cargar categorías
    fetch(`${API_URL}/productos`)
        .then(response => response.json())
        .then(data => {
            const categorias = [...new Set(data.map(producto => producto.categoria))];
            filtroCategoria.innerHTML += categorias.map(cat => `
                <option value="${cat}">${cat}</option>
            `).join('');
        });

    // Cargar productos
    const cargarProductos = (categoria = '') => {
        fetch(`${API_URL}/productos`)
            .then(response => response.json())
            .then(data => {
                const productosFiltrados = categoria ? data.filter(p => p.categoria === categoria) : data;
                contenedor.innerHTML = productosFiltrados.map(producto => `
                    <div class="producto">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                        <h3>${producto.nombre}</h3>
                        <p>Precio: $${producto.precio}</p>
                        <button onclick="verDetalle(${producto.id})">Ver Detalle</button>
                    </div>
                `).join('');
            });
    };

    // Filtro por categoría
    filtroCategoria.addEventListener('change', (e) => {
        cargarProductos(e.target.value);
    });

    cargarProductos(); // Cargar todos los productos inicialmente
});

// Función para ir al detalle del producto
const verDetalle = (id) => {
    window.location.href = `detalle.html?id=${id}`;
};
