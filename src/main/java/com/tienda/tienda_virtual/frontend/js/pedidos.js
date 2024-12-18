const API_URL = 'http://localhost:8080/api';

// Verificar autenticación antes de cargar pedidos
document.addEventListener('DOMContentLoaded', () => {
    verificarAutenticacion();

    const usuario = JSON.parse(localStorage.getItem('usuario'));
    cargarPedidos(usuario.id);
});

// Cargar pedidos del cliente autenticado
const cargarPedidos = (usuarioId) => {
    fetch(`${API_URL}/pedidos/usuario/${usuarioId}`)
        .then(response => response.json())
        .then(data => {
            const contenedor = document.getElementById('pedidos');

            if (data.length === 0) {
                contenedor.innerHTML = '<p>No tienes pedidos registrados.</p>';
                return;
            }

            contenedor.innerHTML = data.map(pedido => `
                <div class="pedido">
                    <h3>Pedido #${pedido.id}</h3>
                    <p>Fecha: ${new Date(pedido.fecha).toLocaleDateString()}</p>
                    <p>Estado: ${pedido.estado}</p>
                    <p>Total: $${pedido.total}</p>
                    <h4>Productos:</h4>
                    <ul>
                        ${pedido.pedidoProductos.map(item => `
                            <li>${item.producto.nombre} - Cantidad: ${item.cantidad}</li>
                        `).join('')}
                    </ul>
                </div>
            `).join('');
        })
        .catch(error => console.error('Error al cargar pedidos:', error));
};
