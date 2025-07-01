import { Component } from '@angular/core';
import { ProductDetail } from '@app/components/product-detail/product-detail';

@Component({
  selector: 'app-product',
  imports: [ProductDetail],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product {

}
