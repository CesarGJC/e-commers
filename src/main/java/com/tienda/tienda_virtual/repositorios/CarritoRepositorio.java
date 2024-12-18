package com.tienda.tienda_virtual.repositorios;

import com.tienda.tienda_virtual.entidades.Carrito;
import com.tienda.tienda_virtual.entidades.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarritoRepositorio extends JpaRepository<Carrito, Long> {
    List<Carrito> findByUsuario(Usuario usuario); // Productos en el carrito de un usuario
}