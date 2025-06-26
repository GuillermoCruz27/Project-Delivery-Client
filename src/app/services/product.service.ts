import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);
  apiUrl = environment.API_URL;

  getProducts() {
    return this.http.get(`${this.apiUrl}/products`);
  }
}
