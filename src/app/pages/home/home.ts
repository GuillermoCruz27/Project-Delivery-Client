import { Component } from '@angular/core';
import { ProductCard } from '@app/components/product-card/product-card';

@Component({
  selector: 'app-home',
  imports: [ProductCard],
  templateUrl: './home.html',
})
export class Home {}
