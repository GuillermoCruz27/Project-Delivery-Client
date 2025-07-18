import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen_url: string;
  mercadoPagoLink: string;
  categoria?: { id: number, nombre: string };
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = environment.API_URL;
  apiUrlLocal = environment.API_LOCAL + "/productos";

  constructor(private http: HttpClient) { }
  /*
  getProducts() {
    return this.http.get(`${this.apiUrl}/products`);
  }*/
  getProducts(): Observable<Producto[]> {
    return this.http.get<any>(`${this.apiUrlLocal}`).pipe(
      map((res) => res.data as Producto[])
    );
  }

  getProductsByCategorias(categorias: number[]): Observable<Producto[]> {
    return this.http.post<any>(`${this.apiUrlLocal}/filtrar/categorias`, { categorias }).pipe(
      map((res) => res.data as Producto[])
    );
  }

  getProductById(id: number): Observable<{ success: boolean; data: Producto; message: string }> {
    return this.http.get<{ success: boolean; data: Producto; message: string }>(`${this.apiUrlLocal}/${id}`);
  }
}
