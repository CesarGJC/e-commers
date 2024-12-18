package com.tienda.tienda_virtual.repositorios;

import com.tienda.tienda_virtual.entidades.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductoRepositorio extends JpaRepository<Producto, Long> {
    List<Producto> findByCategoria(String categoria); // Para buscar productos por categoría
}