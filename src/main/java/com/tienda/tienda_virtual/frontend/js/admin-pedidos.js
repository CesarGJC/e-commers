const API_URL = 'http://localhost:8080/api';

// Verificar rol de administrador antes de cargar pedidos
document.addEventListener('DOMContentLoaded', () => {
    verificarRol('administrador');
    cargarPedidosAdmin();
});

// Cargar todos los pedidos
const cargarPedidosAdmin = () => {
    fetch(`${API_URL}/pedidos`)//revisar
        .then(response => response.json())
        .then(data => {
            const contenedor = document.getElementById('pedidos-admin');

            if (data.length === 0) {
                contenedor.innerHTML = '<p>No hay pedidos registrados.</p>';
                return;
            }

            contenedor.innerHTML = data.map(pedido => `
                <div class="pedido">
                    <h3>Pedido #${pedido.id}</h3>
                    <p>Cliente: ${pedido.usuario.nombre}</p>
                    <p>Fecha: ${new Date(pedido.fecha).toLocaleDateString()}</p>
                    <p>Estado: ${pedido.estado}</p>
                    <p>Total: $${pedido.total}</p>
                    <h4>Productos:</h4>
                    <ul>
                        ${pedido.pedidoProductos.map(item => `
                            <li>${item.producto.nombre} - Cantidad: ${item.cantidad}</li>
                        `).join('')}
                    </ul>
                    <button onclick="cambiarEstado(${pedido.id}, 'pagado')">Marcar como Pagado</button>
                </div>
            `).join('');
        })
        .catch(error => console.error('Error al cargar pedidos:', error));
};

// Cambiar estado del pedido
const cambiarEstado = (pedidoId, nuevoEstado) => {
    fetch(`${API_URL}/pedidos/${pedidoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado })
    })
        .then(() => {
            alert(`Estado del pedido #${pedidoId} actualizado a ${nuevoEstado}.`);
            cargarPedidosAdmin();
        })
        .catch(error => console.error('Error al cambiar el estado del pedido:', error));
};
