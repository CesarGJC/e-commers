document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('usuario'); // Elimina la información del usuario
    alert('Has cerrado sesión.');
    window.location.href = './login.html'; // Redirige al login
});
