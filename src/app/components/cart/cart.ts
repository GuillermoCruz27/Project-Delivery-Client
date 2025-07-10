import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CartItem } from '@app/models/cart-item.model';
import { CartService } from '@app/services/cart.service';

@Component({
  selector: 'app-cart-component',
  imports: [MatCardModule,MatButtonModule,CommonModule,MatIconModule,RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCarrito().subscribe(carrito => {
      this.items = carrito;
      this.total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    });
  }

  eliminar(item: CartItem) {
    this.cartService.eliminarProducto(item.producto_id);
  }

  vaciar() {
    this.cartService.limpiarCarrito();
  }

  aumentarCantidad(item: CartItem) {
    this.cartService.actualizarCantidad(item.producto_id, item.cantidad + 1);
  }

  disminuirCantidad(item: CartItem) {
    if (item.cantidad > 1) {
      this.cartService.actualizarCantidad(item.producto_id, item.cantidad - 1);
    } else {
      this.cartService.actualizarCantidad(item.producto_id, 1);
    }
  }
}
