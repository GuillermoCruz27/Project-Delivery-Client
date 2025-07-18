import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen_url: string;
  mercadoPagoLink: string;
  categoria?: { id: number; nombre: string };
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = environment.API_URL;
  apiUrlLocal = environment.API_LOCAL + '/productos';

  // BehaviorSubject para manejar el término de búsqueda
  private readonly searchTermSubject = new BehaviorSubject<string>('');
  public searchTerm$ = this.searchTermSubject.asObservable();

  constructor(private readonly http: HttpClient) {}
  /*
  getProducts() {
    return this.http.get(`${this.apiUrl}/products`);
  }*/
  getProducts(): Observable<Producto[]> {
    return this.http
      .get<any>(`${this.apiUrlLocal}`)
      .pipe(map((res) => res.data as Producto[]));
  }

  getProductsByCategorias(categorias: number[]): Observable<Producto[]> {
    return this.http
      .post<any>(`${this.apiUrlLocal}/filtrar/categorias`, { categorias })
      .pipe(map((res) => res.data as Producto[]));
  }

  getProductById(
    id: number
  ): Observable<{ success: boolean; data: Producto; message: string }> {
    return this.http.get<{ success: boolean; data: Producto; message: string }>(
      `${this.apiUrlLocal}/${id}`
    );
  }

  // Método para buscar productos por término
  searchProducts(searchTerm: string): Observable<Producto[]> {
    if (!searchTerm.trim()) {
      return this.getProducts();
    }

    // Intentar buscar en la API primero, si falla usar filtrado local
    return this.http
      .get<any>(
        `${this.apiUrlLocal}/buscar?q=${encodeURIComponent(searchTerm)}`
      )
      .pipe(
        map((res) => res.data as Producto[]),
        // Si la API falla, usar el método de filtrado local
        catchError(() => this.searchProductsLocally(searchTerm))
      );
  }

  // Método para filtrar productos localmente
  searchProductsLocally(searchTerm: string): Observable<Producto[]> {
    return this.getProducts().pipe(
      map((productos: Producto[]) => {
        if (!searchTerm.trim()) {
          return productos;
        }

        const term = searchTerm.toLowerCase();
        return productos.filter(
          (producto) =>
            producto.nombre.toLowerCase().includes(term) ||
            producto.descripcion.toLowerCase().includes(term) ||
            producto.categoria?.nombre?.toLowerCase().includes(term)
        );
      })
    );
  }

  // Método para actualizar el término de búsqueda
  updateSearchTerm(searchTerm: string): void {
    this.searchTermSubject.next(searchTerm);
  }

  // Método para obtener el término de búsqueda actual
  getCurrentSearchTerm(): string {
    return this.searchTermSubject.value;
  }
}
