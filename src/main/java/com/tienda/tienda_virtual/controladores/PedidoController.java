package com.tienda.tienda_virtual.controladores;

import com.tienda.tienda_virtual.entidades.Pedido;
import com.tienda.tienda_virtual.entidades.Usuario;
import com.tienda.tienda_virtual.servicios.PedidoServicio;
import com.tienda.tienda_virtual.servicios.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoServicio pedidoServicio;

    @GetMapping
    public List<Pedido> listarTodosLosPedidos() {
        return pedidoServicio.listarPedidos();
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<Pedido> obtenerPedidosPorUsuario(@PathVariable Long usuarioId) {
        return pedidoServicio.listarPedidosPorUsuario(usuarioId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pedido> actualizarEstadoPedido(@PathVariable Long id, @RequestBody Pedido pedido) {
        Pedido pedidoExistente = pedidoServicio.buscarPorId(id);
        pedidoExistente.setEstado(pedido.getEstado());
        pedidoServicio.guardarPedido(pedidoExistente);
        return ResponseEntity.ok(pedidoExistente);
    }
}
