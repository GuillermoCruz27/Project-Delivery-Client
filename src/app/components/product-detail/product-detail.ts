import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '@app/services/cart.service';
import { Producto, ProductService } from '@app/services/product.service';

@Component({
  selector: 'app-product-detail',
  imports: [MatCardModule,MatButtonModule,CommonModule,MatIconModule,MatSnackBarModule],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css'],
})
export class ProductDetail implements OnInit {
  producto!: Producto;
  loading = false;
  error = '';
  imagenes: string[] = [];
  cantidadSeleccionada: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private carritoService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loading = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: res => {
          this.producto = res.data;
          this.loading = false;
          this.producto = res.data;
          this.imagenes = [
            'http://localhost:3000'+this.producto.imagen_url, // imagen principal
          ];
        },
        error: (err) => { 
          this.error = 'No se pudo cargar el producto.';
          this.loading = false;
        }
      });
    } else {
      this.error = 'ID de producto inválido.';
      this.loading = false;
    }
  }

  agregarAlCarrito() {
    if (!this.producto) return;
    this.carritoService.agregarProducto({
      producto_id: this.producto.id,
      nombre: this.producto.nombre,
      precio: this.producto.precio,
      cantidad: this.cantidadSeleccionada,
      imagen_url: this.producto.imagen_url,
      categoria: this.producto.categoria
    });
    // Mostrar snackbar
    this.snackBar.open('Producto agregado al carrito', 'Cerrar', {
      duration: 3000, // 3 segundos
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success']
    });
  }
}
