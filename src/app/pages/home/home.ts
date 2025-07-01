import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Categories } from '@app/components/categories/categories';
import { ProductList } from '@app/components/product-list/product-list';
import { Product } from '@app/models/product.model';
import { ProductService } from '@app/services/product.service';

@Component({
  selector: 'app-home',
  imports: [ProductList, MatCardModule, Categories],
  templateUrl: './home.html',
})
export class Home implements OnInit {
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
  }
}
