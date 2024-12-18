package com.tienda.tienda_virtual.repositorios;

import com.tienda.tienda_virtual.entidades.PedidoProducto;
import com.tienda.tienda_virtual.entidades.PedidoProductoId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoProductoRepositorio extends JpaRepository<PedidoProducto, PedidoProductoId> {
}