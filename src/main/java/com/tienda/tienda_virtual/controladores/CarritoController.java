package com.tienda.tienda_virtual.controladores;

import com.tienda.tienda_virtual.entidades.Carrito;
import com.tienda.tienda_virtual.entidades.Usuario;
import com.tienda.tienda_virtual.servicios.CarritoServicio;
import com.tienda.tienda_virtual.servicios.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carrito")
public class CarritoController {

    @Autowired
    private CarritoServicio carritoServicio;

    @Autowired
    private UsuarioServicio usuarioServicio;

    @GetMapping("/{usuarioId}")
    public List<Carrito> obtenerCarritoPorUsuario(@PathVariable Long usuarioId) {
        Usuario usuario = usuarioServicio.buscarPorId(usuarioId).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return carritoServicio.obtenerCarritoPorUsuario(usuario);
    }

    @PostMapping
    public Carrito agregarProductoAlCarrito(@RequestBody Carrito carrito) {
        return carritoServicio.agregarAlCarrito(carrito);
    }

    @DeleteMapping("/{id}")
    public void eliminarProductoDelCarrito(@PathVariable Long id) {
        carritoServicio.eliminarDelCarrito(id);
    }
}