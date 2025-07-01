import { Component, Input } from '@angular/core';
import { Product } from '@app/models/product.model';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
})
export class ProductList {
  @Input() products: Product[] = [];
}
