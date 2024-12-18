document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página

    const email = document.getElementById('email').value;
    const contraseña = document.getElementById('contraseña').value;

    try {
        const response = await fetch('http://localhost:8089/login', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(email + ':' + contraseña),
            },
        });

        if (response.ok) {
            alert('Inicio de sesión exitoso.');
            localStorage.setItem('usuario', email); // Guarda el email en localStorage
            window.location.href = './dashboard.html'; // Redirige al dashboard
        } else {
            alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
        }
    } catch (err) {
        console.error('Error al iniciar sesión:', err);
        alert('Hubo un problema al iniciar sesión.');
    }
});
