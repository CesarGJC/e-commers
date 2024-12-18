package com.tienda.tienda_virtual;

import com.tienda.tienda_virtual.entidades.Usuario;
import com.tienda.tienda_virtual.repositorios.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (usuarioRepositorio.count() == 0) {
            Usuario admin = new Usuario();
            admin.setNombre("Admin");
            admin.setEmail("admin@tienda.com");
            admin.setContraseña(passwordEncoder.encode("admin123"));
            admin.setRol("ROLE_ADMIN");
            usuarioRepositorio.save(admin);

            Usuario cliente = new Usuario();
            cliente.setNombre("Cliente");
            cliente.setEmail("cliente@tienda.com");
            cliente.setContraseña(passwordEncoder.encode("cliente123"));
            cliente.setRol("ROLE_USER");
            usuarioRepositorio.save(cliente);
        }
    }
}