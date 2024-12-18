package com.tienda.tienda_virtual.servicios;

import com.tienda.tienda_virtual.entidades.Pedido;
import com.tienda.tienda_virtual.entidades.Usuario;
import com.tienda.tienda_virtual.repositorios.PedidoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoServicio {

    @Autowired
    private PedidoRepositorio pedidoRepositorio;

    public List<Pedido> listarPedidos() {
        return pedidoRepositorio.findAll();
    }

    public List<Pedido> listarPedidosPorUsuario(Long usuarioId) {
        return pedidoRepositorio.findByUsuarioId(usuarioId);
    }

    public Pedido buscarPorId(Long id) {
        return pedidoRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
    }

    public Pedido guardarPedido(Pedido pedido) {
        return pedidoRepositorio.save(pedido);
    }
}
