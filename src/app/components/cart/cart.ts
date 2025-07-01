import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-cart-component',
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent {

}
