package com.tienda.tienda_virtual.servicios;

import com.tienda.tienda_virtual.entidades.Usuario;
import com.tienda.tienda_virtual.repositorios.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UsuarioServicio {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;
    private final PasswordEncoder passwordEncoder;

    private ConcurrentHashMap<String, String> tokensRecuperacion = new ConcurrentHashMap<>();

    public void generarTokenRecuperacion(String email) {
        Usuario usuario = usuarioRepositorio.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        String token = UUID.randomUUID().toString();
        tokensRecuperacion.put(token, email);

        // Simular el envío de correo (reemplazar con servicio real como SendGrid o JavaMail)
        System.out.println("Enlace de recuperación: http://localhost:8080/restablecer?token=" + token);
    }

    public boolean validarToken(String token) {
        return tokensRecuperacion.containsKey(token);
    }

    public Usuario obtenerUsuarioPorToken(String token) {
        String email = tokensRecuperacion.get(token);
        return usuarioRepositorio.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }
    public List<Usuario> listarUsuarios() {
        return usuarioRepositorio.findAll();
    }

    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepositorio.findById(id);
    }

    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepositorio.findByEmail(email);
    }

    public void eliminarUsuario(Long id) {
      usuarioRepositorio.deleteById(id);
    }

    @Autowired
    public UsuarioServicio(UsuarioRepositorio usuarioRepositorio, PasswordEncoder passwordEncoder) {
        this.usuarioRepositorio = usuarioRepositorio;
        this.passwordEncoder = passwordEncoder;
    }

    public void registrarUsuario(Usuario usuario) {
        usuario.setContraseña(passwordEncoder.encode(usuario.getContraseña()));
        Usuario usuarioGuardado = usuarioRepositorio.save(usuario);
    }

}