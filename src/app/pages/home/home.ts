import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { Categories } from '@app/components/categories/categories';
import { ProductList } from '@app/components/product-list/product-list';
import { Product } from '@app/models/product.model';
import { Producto, ProductService } from '@app/services/product.service';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    ProductList,
    MatCardModule,
    Categories,
    MatButtonModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './home.html',
})
export class Home implements OnInit, OnDestroy {
  products: Producto[] = [];
  allProducts: Producto[] = []; // Guardar todos los productos para filtrar localmente
  selectedCategoryIds: number[] = [];
  currentSearchTerm = '';
  isLoading = false;

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.loadInitialProducts();
    this.setupSearchSubscription();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadInitialProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (data: Producto[]) => {
        this.allProducts = data;
        this.products = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      },
    });
  }

  private setupSearchSubscription(): void {
    this.productService.searchTerm$
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(150), // Reducir el debounce para búsqueda más rápida
        distinctUntilChanged()
      )
      .subscribe((searchTerm) => {
        this.currentSearchTerm = searchTerm;
        this.filterProductsLocally(searchTerm);
      });
  }

  private filterProductsLocally(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.products = this.allProducts;
      return;
    }

    const term = searchTerm.toLowerCase().trim();
    this.products = this.allProducts.filter((product) => {
      const nombre = product.nombre.toLowerCase();
      const descripcion = product.descripcion.toLowerCase();
      const categoria = product.categoria?.nombre?.toLowerCase() || '';

      // Coincidencia exacta (mayor prioridad)
      const exactMatch =
        nombre.includes(term) ||
        descripcion.includes(term) ||
        categoria.includes(term);

      // Coincidencia al inicio de palabras (buena para búsquedas parciales)
      const wordsMatch =
        this.matchesWordStart(nombre, term) ||
        this.matchesWordStart(descripcion, term) ||
        this.matchesWordStart(categoria, term);

      // Coincidencia de múltiples palabras
      const multiWordMatch = this.matchesMultipleWords(
        nombre + ' ' + descripcion + ' ' + categoria,
        term
      );

      return exactMatch || wordsMatch || multiWordMatch;
    });
  }

  private matchesWordStart(text: string, searchTerm: string): boolean {
    if (!text || !searchTerm) return false;

    // Dividir el texto en palabras y verificar si alguna empieza con el término de búsqueda
    const words = text.split(/\s+/);
    return words.some((word) => word.startsWith(searchTerm));
  }

  private matchesMultipleWords(text: string, searchTerm: string): boolean {
    if (!text || !searchTerm) return false;

    // Dividir el término de búsqueda en palabras
    const searchWords = searchTerm
      .split(/\s+/)
      .filter((word) => word.length > 1);
    if (searchWords.length === 0) return false;

    // Verificar que todas las palabras de búsqueda estén presentes
    return searchWords.every((word) => text.includes(word));
  }

  loadProducts(): void {
    if (this.selectedCategoryIds.length > 0) {
      this.productService
        .getProductsByCategorias(this.selectedCategoryIds)
        .subscribe((data) => (this.products = data));
    } else {
      this.productService
        .getProducts()
        .subscribe((data) => (this.products = data));
    }
  }

  onCategoriesChanged(categoryIds: number[]): void {
    this.selectedCategoryIds = categoryIds;
    this.loadProducts();
  }

  clearSearch(): void {
    this.productService.updateSearchTerm('');
  }
}
