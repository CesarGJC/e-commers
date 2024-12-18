package com.tienda.tienda_virtual.repositorios;

import com.tienda.tienda_virtual.entidades.Pedido;
import com.tienda.tienda_virtual.entidades.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PedidoRepositorio extends JpaRepository<Pedido, Long> {
    List<Pedido> findByUsuarioId(Long usuarioId);
}
