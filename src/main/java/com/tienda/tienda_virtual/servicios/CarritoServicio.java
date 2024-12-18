package com.tienda.tienda_virtual.servicios;

import com.tienda.tienda_virtual.entidades.Carrito;
import com.tienda.tienda_virtual.entidades.Usuario;
import com.tienda.tienda_virtual.repositorios.CarritoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarritoServicio {

    @Autowired
    private CarritoRepositorio carritoRepositorio;

    public List<Carrito> obtenerCarritoPorUsuario(Usuario usuario) {
        return carritoRepositorio.findByUsuario(usuario);
    }

    public Carrito agregarAlCarrito(Carrito carrito) {
        return carritoRepositorio.save(carrito);
    }

    public void eliminarDelCarrito(Long id) {
        carritoRepositorio.deleteById(id);
    }
}