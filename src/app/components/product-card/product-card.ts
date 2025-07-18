import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { Product } from '@app/models/product.model';
import { CartService } from '@app/services/cart.service';
import { Producto } from '@app/services/product.service';

@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, MatButtonModule, CurrencyPipe, RouterModule],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css'],
})
export class ProductCard {
  //@Input() product!: Product;
  @Input() product!: Producto;

  cantidadSeleccionada = 1;

  constructor(private carritoService: CartService, private snackBar: MatSnackBar) {}

  agregarAlCarrito() {
    if (!this.product) return;
    this.carritoService.agregarProducto({
      producto_id: this.product.id,
      nombre: this.product.nombre,
      precio: this.product.precio,
      cantidad: this.cantidadSeleccionada,
      imagen_url: this.product.imagen_url,
      categoria: this.product.categoria,
    });
    this.snackBar.open('Producto agregado al carrito', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success'],
    });
  }
}
