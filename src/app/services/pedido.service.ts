import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pedido } from "@app/models/pedido.model";
import { forkJoin, Observable } from "rxjs";
import { CartService } from "./cart.service";

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private apiUrl = 'http://localhost:3000/api/pedido';

  constructor(private http: HttpClient, private cartService: CartService) {}

  crearPedido(pedido: Pedido): Observable<any> {
    return this.http.post(this.apiUrl, pedido);
  }

  guardarDetallesPedido(pedidoId: number): Observable<any> {
    const carrito = this.cartService.getCarritoSnapshot(); // Método que agregaremos
    const requests = carrito.map(item => {
      return this.http.post(`${this.apiUrl}/${pedidoId}/detalles`, {
        producto: item.producto_id,
        cantidad: item.cantidad
      });
    });
    return forkJoin(requests); // Ejecuta todos los POST en paralelo
  }

  pagarPedido(pedidoId: number): Observable<any> {
    return this.http.post('http://localhost:3000/api/pago', {
        pedido: pedidoId
    });
    }
}