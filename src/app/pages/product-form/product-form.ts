import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm implements OnInit {
  form!: FormGroup;
  categorias: any[] = [];
  imagen: File | null = null;
  idProducto: number | null = null;
  titulo: string = 'Crear nuevo producto';
  btnCancelar: string = 'Cancelar';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
      categoria: ['', Validators.required]
    });

    this.obtenerCategorias();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idProducto = +id;
      this.titulo = 'Editar producto';
      this.cargarProducto(+id);
      this.btnCancelar = 'Volver';
    }
  }

  obtenerCategorias() {
    this.http.get<any>('http://localhost:3000/api/categorias').subscribe(res => {
      this.categorias = res.data;
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.imagen = input.files[0];
    }
  }

  submit() {
    const formData = new FormData();
    Object.entries(this.form.value).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });
    if (this.imagen) {
      formData.append('image', this.imagen);
    }

    const id = this.route.snapshot.paramMap.get('id');

    const request$ = id
      ? this.http.put(`http://localhost:3000/api/productos/${id}`, formData)
      : this.http.post('http://localhost:3000/api/productos', formData);

    request$.subscribe({
      next: (res: any) => {
        this.snackBar.open(id ? 'Producto actualizado' : 'Producto creado', 'Cerrar', { duration: 3000 });
        //this.router.navigate(id ?['/']:['new/product']);
      },
      error: () => {
        this.snackBar.open('Error al guardar el producto', 'Cerrar', { duration: 3000 });
      }
    });
  }

  cancel() {
    if (this.idProducto) {
    this.router.navigate(['/product', this.idProducto]);
    } else {
      this.form.reset();
      this.imagen = null;
    }
  }

  cargarProducto(id: number) {
    this.http.get<any>(`http://localhost:3000/api/productos/${id}`).subscribe({
      next: (res) => {
        const producto = res.data;
        this.form.patchValue({
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          stock: producto.stock,
          categoria: producto.categoria?.id,
        });
      },
      error: () => {
        this.snackBar.open('Error al cargar el producto', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
