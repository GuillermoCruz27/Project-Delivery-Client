import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { Categories } from '@app/components/categories/categories';
import { ProductList } from '@app/components/product-list/product-list';
import { Product } from '@app/models/product.model';
import { Producto, ProductService } from '@app/services/product.service';

@Component({
  selector: 'app-home',
  imports: [ProductList, MatCardModule, Categories, MatButtonModule, RouterModule],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  /*
  products: Product[] = [];
  selectedCategoryIds: number[] = [];

  onCategoriesChanged(categoryIds: number[]): void {
    this.selectedCategoryIds = categoryIds;
  }

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
    });
  }*/
  products: Producto[] = [];
  selectedCategoryIds: number[] = [];

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    if (this.selectedCategoryIds.length > 0) {
      this.productService.getProductsByCategorias(this.selectedCategoryIds).subscribe(
        (data) => (this.products = data)
      );
    } else {
      this.productService.getProducts().subscribe(
        (data) => (this.products = data)
      );
    }
  }

  onCategoriesChanged(categoryIds: number[]): void {
    this.selectedCategoryIds = categoryIds;
    this.loadProducts();
  }
}
