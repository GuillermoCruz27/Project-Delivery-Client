import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartService } from '@app/services/cart.service';
import { PedidoService } from '@app/services/pedido.service';

@Component({
  selector: 'app-client-form',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,],
  templateUrl: './client-form.html',
  styleUrl: './client-form.css'
})
export class ClientForm {
    form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    private pedidoService: PedidoService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: [''],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.http.post('http://localhost:3000/api/cliente', this.form.value).subscribe({
      next: (res:any) => {
        this.realizarCompra(res.data.id)
        this.snackBar.open('Cliente creado con éxito y pago realizado', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/']);
      },
      error: () => {
        this.snackBar.open('Error al crear el cliente', 'Cerrar', { duration: 3000 });
      }
    });
  }

  realizarCompra(clienteId: number) {
    let pedidoId: number;

    this.pedidoService.crearPedido({ cliente: clienteId,cadete:1,observacion:'' }).subscribe({
      next: (pedido) => {
        pedidoId = pedido.data.id;

        this.cartService.getCarrito().subscribe(carrito => {
          if (carrito.length === 0) {
            console.warn('El carrito está vacío');
            return;
          }

          this.pedidoService.guardarDetallesPedido(pedidoId).subscribe({
            next: () => {
              // Paso 3: Realizar pago
              this.pedidoService.pagarPedido(pedidoId).subscribe({
                next: () => {
                  console.log('Compra realizada con éxito');
                  this.cartService.limpiarCarrito();
                  // Abrir nueva pestaña con el link de MercadoPago
                  window.open('https://mpago.la/1kWHaXm', '_blank');
                },
                error: err => {
                  console.error('Error al pagar el pedido', err);
                }
              });
            },
            error: err => {
              console.error('Error al guardar los detalles del pedido', err);
            }
          });
        });
      },
      error: err => {
        console.error('Error al crear el pedido', err);
      }
    });
  }

  cancelar() {
    this.router.navigate(['/cart']);
  }
}
