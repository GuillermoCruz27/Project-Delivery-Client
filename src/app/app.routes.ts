import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Shop } from './pages/shop/shop';
import { Cart } from './pages/cart/cart';
import { NotFound } from './pages/not-found/not-found';
import { Product } from './pages/product/product';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'shop',
    component: Shop,
  },
  {
    path: 'cart',
    component: Cart,
  },
  {
    path: 'product/:id',
    component: Product,
  },
  { 
    path: '**', 
    redirectTo: 'not-found' 
  }
];
