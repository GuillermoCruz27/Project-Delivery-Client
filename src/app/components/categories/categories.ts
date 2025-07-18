import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Categoria } from '@app/models/categoria.model';
import { CategoriaService } from '@app/services/categoria.service';

interface Category {
  id: number;
  name: string;
  icon: string;
  selected: boolean;
}

@Component({
  selector: 'app-categories',
  imports: [MatIconModule, MatButtonModule, FormsModule, MatCheckboxModule],
  templateUrl: './categories.html',
  styleUrls: ['./categories.css'],
})

/*
export class Categories {
  @Output() categoriesChanged = new EventEmitter<number[]>();

  categories: Category[] = [
    { id: 1, name: 'Sandwiches', icon: 'lunch_dining', selected: false },
    { id: 2, name: 'Empanadas', icon: 'bakery_dining', selected: false },
    { id: 3, name: 'Pizzas', icon: 'local_pizza', selected: false },
    { id: 4, name: 'Hamburguesas', icon: 'fastfood', selected: false },
    { id: 5, name: 'Gaseosas', icon: 'local_drink', selected: false },
    { id: 6, name: 'Jugos', icon: 'emoji_food_beverage', selected: false },
    { id: 7, name: 'Postres', icon: 'cake', selected: false },
    { id: 8, name: 'Ensaladas', icon: 'eco', selected: false },
    { id: 9, name: 'Pastas', icon: 'ramen_dining', selected: false },
    { id: 10, name: 'Milanesas', icon: 'restaurant', selected: false },
  ];

  constructor() {}

  onCategoryChange(category: Category): void {
    this.emitSelectedCategories();
  }

  clearAllFilters(): void {
    this.categories.forEach((category) => (category.selected = false));
    this.emitSelectedCategories();
  }

  private emitSelectedCategories(): void {
    const selectedIds = this.categories
      .filter((category) => category.selected)
      .map((category) => category.id);

    this.categoriesChanged.emit(selectedIds);
  }

  get hasSelectedCategories(): boolean {
    return this.categories.some((category) => category.selected);
  }

  get selectedCount(): number {
    return this.categories.filter((category) => category.selected).length;
  }
}*/

export class Categories implements OnInit {
  @Output() categoriesChanged = new EventEmitter<number[]>();
  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data.map(cat => ({ ...cat, selected: false }));
      },
      error: (err) => console.error('Error al cargar categorías', err),
    });
  }

  onCategoryChange(): void {
    const selectedIds = this.categorias
      .filter((cat) => cat.selected)
      .map((cat) => cat.id);

    this.categoriesChanged.emit(selectedIds);
  }

  clearAllFilters(): void {
    this.categorias.forEach((cat) => (cat.selected = false));
    this.onCategoryChange();
  }

  get hasSelectedCategories(): boolean {
    return this.categorias.some((cat) => cat.selected);
  }

  get selectedCount(): number {
    return this.categorias.filter((cat) => cat.selected).length;
  }
}
