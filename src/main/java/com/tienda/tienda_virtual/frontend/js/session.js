document.addEventListener('DOMContentLoaded', () => {
    const usuario = localStorage.getItem('usuario'); // Recupera el usuario almacenado
    if (!usuario) {
        alert('Por favor, inicia sesión primero.');
        window.location.href = './login.html'; // Redirige al login si no está autenticado
    } else {
        console.log(`Bienvenido, ${usuario}`);
    }
});
