import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-product-detail',
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './product-detail.html',
})
export class ProductDetail {

}
