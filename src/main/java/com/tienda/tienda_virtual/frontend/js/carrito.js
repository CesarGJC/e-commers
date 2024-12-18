const API_URL = 'http://localhost:8080/api';
const usuarioId = 1; // Reemplazar con el ID del usuario autenticado

// Cargar el carrito del usuario
document.addEventListener('DOMContentLoaded', () => {
    fetch(`${API_URL}/carrito/${usuarioId}`)
        .then(response => response.json())
        .then(data => {
            const contenedor = document.getElementById('carrito');
            let total = 0;

            if (data.length > 0) {
                contenedor.innerHTML = data.map(item => {
                    const subtotal = item.cantidad * item.producto.precio;
                    total += subtotal;

                    return `
                        <div class="carrito-item">
                            <img src="${item.producto.imagen}" alt="${item.producto.nombre}">
                            <h3>${item.producto.nombre}</h3>
                            <p>Precio: $${item.producto.precio}</p>
                            <p>Cantidad: 
                                <input type="number" value="${item.cantidad}" 
                                    onchange="actualizarCantidad(${item.id}, this.value)">
                            </p>
                            <p>Subtotal: $${subtotal.toFixed(2)}</p>
                            <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
                        </div>
                    `;
                }).join('');
            } else {
                contenedor.innerHTML = `<p>El carrito está vacío.</p>`;
            }

            document.getElementById('total-monto').textContent = total.toFixed(2);
        })
        .catch(error => console.error('Error al cargar el carrito:', error));
});

// Actualizar cantidad de producto
const actualizarCantidad = (carritoId, cantidad) => {
    fetch(`${API_URL}/carrito/${carritoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cantidad })
    }).then(() => location.reload());
};

// Eliminar producto del carrito
const eliminarDelCarrito = (carritoId) => {
    fetch(`${API_URL}/carrito/${carritoId}`, { method: 'DELETE' })
        .then(() => location.reload());
};

// Registrar pedido
const registrarPedido = () => {
    fetch(`${API_URL}/pedidos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario: { id: usuarioId } })
    })
        .then(() => {
            alert('Pedido registrado con éxito.');
            location.href = 'index.html';
        })
        .catch(error => console.error('Error al registrar el pedido:', error));
};
