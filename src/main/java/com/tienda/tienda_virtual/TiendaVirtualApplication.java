package com.tienda.tienda_virtual;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.tienda.tienda_virtual"})
public class TiendaVirtualApplication {
	public static void main(String[] args) {
		SpringApplication.run(TiendaVirtualApplication.class, args);
	}
}