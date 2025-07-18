import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '@app/services/product.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  searchControl = new FormControl('');

  constructor(
    private readonly productService: ProductService,
    private readonly router: Router
  ) {
    // Suscribirse a los cambios en el input de búsqueda con debounce
    this.searchControl.valueChanges
      .pipe(
        debounceTime(150), // Reducir para búsqueda más rápida
        distinctUntilChanged() // Solo emitir si el valor cambió
      )
      .subscribe((searchTerm) => {
        if (searchTerm !== null) {
          this.performSearch(searchTerm);
        }
      });
  }

  onSearchSubmit(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    const searchTerm = this.searchControl.value || '';
    this.performSearch(searchTerm);
  }

  private performSearch(searchTerm: string): void {
    // Actualizar el término de búsqueda en el servicio
    this.productService.updateSearchTerm(searchTerm);

    // Si estamos en otra página, navegar al home para mostrar los resultados
    if (this.router.url !== '/' && this.router.url !== '/home') {
      this.router.navigate(['/home']);
    }
  }
}
