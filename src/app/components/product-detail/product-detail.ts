import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Producto, ProductService } from '@app/services/product.service';

@Component({
  selector: 'app-product-detail',
  imports: [MatCardModule,MatButtonModule,CommonModule,MatIconModule],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css'],
})
export class ProductDetail implements OnInit {
  producto!: Producto;
  loading = false;
  error = '';
  imagenes: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
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
            this.producto.imagen_url, // imagen principal
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
}
