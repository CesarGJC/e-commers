const API_URL = 'http://localhost:8080/api';

// Registro de usuario
document.getElementById('registro-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const usuario = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        contraseña: document.getElementById('password').value,
        rol: 'cliente' // Por defecto, el rol será cliente
    };

    fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
    })
        .then(response => {
            if (response.ok) {
                alert('Usuario registrado con éxito.');
                window.location.href = 'login.html';
            } else {
                alert('Error al registrar el usuario.');
            }
        })
        .catch(error => console.error('Error en el registro:', error));
});
// Inicio de sesión
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const credenciales = {
        email: document.getElementById('email').value,
        contraseña: document.getElementById('password').value
    };

    fetch(`${API_URL}/usuarios/email/${credenciales.email}`)
        .then(response => response.json())
        .then(usuario => {
            if (usuario.contraseña === credenciales.contraseña) {
                // Guardar información del usuario en el almacenamiento local
                localStorage.setItem('usuario', JSON.stringify(usuario));
                alert('Inicio de sesión exitoso.');
                window.location.href = 'index.html'; // Redirigir al inicio
            } else {
                alert('Credenciales incorrectas.');
            }
        })
        .catch(error => alert('Error al iniciar sesión. Verifique sus credenciales.'));
});
