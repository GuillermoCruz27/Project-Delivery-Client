import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CartItem } from '@app/models/cart-item.model';
import { CartService } from '@app/services/cart.service';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart-component',
  imports: [MatCardModule,MatButtonModule,CommonModule,MatIconModule,RouterModule,MatDialogModule,MatSnackBarModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  total: number = 0;

  constructor(
    private cartService: CartService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.cartService.getCarrito().subscribe(carrito => {
      this.items = carrito;
      this.total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    });
  }

  eliminar(item: CartItem) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '350px',
      data: {
        titulo: 'Mensaje de confirmación',
        mensaje: '¿Estás seguro que deseas eliminar este producto del carrito?',
      },
    });
    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.cartService.eliminarProducto(item.producto_id);
        this.snackBar.open('Producto eliminado del carrito', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-success'],
        });
      }
    });
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
