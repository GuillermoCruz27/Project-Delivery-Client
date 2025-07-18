import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private carrito: CartItem[] = [];
  private carritoSubject = new BehaviorSubject<CartItem[]>([]);

  constructor() {
    const almacenado = localStorage.getItem('carrito');
    if (almacenado) {
      this.carrito = JSON.parse(almacenado);
      this.carritoSubject.next(this.carrito);
    }
  }

  private guardarEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  getCarrito() {
    return this.carritoSubject.asObservable();
  }

  agregarProducto(detalle: CartItem) {
    const existente = this.carrito.find(p => p.producto_id === detalle.producto_id);
    if (existente) {
      existente.cantidad += detalle.cantidad;
    } else {
      this.carrito.push({ ...detalle });
    }
    this.guardarEnLocalStorage();
    this.carritoSubject.next(this.carrito);
  }

  eliminarProducto(producto_id: number) {
    this.carrito = this.carrito.filter(p => p.producto_id !== producto_id);
    this.guardarEnLocalStorage();
    this.carritoSubject.next(this.carrito);
  }

  limpiarCarrito() {
    this.carrito = [];
    localStorage.removeItem('carrito');
    this.carritoSubject.next(this.carrito);
  }

  actualizarCantidad(productoId: number, nuevaCantidad: number) {
    const carrito = this.carritoSubject.value.map(item => {
        if (item.producto_id === productoId) {
        return { ...item, cantidad: nuevaCantidad };
        }
        return item;
    });
    this.carritoSubject.next(carrito);
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  getCarritoSnapshot(): CartItem[] {
    return [...this.carrito];
  }
}