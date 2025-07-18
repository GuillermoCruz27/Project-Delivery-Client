import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Shop } from './pages/shop/shop';
import { Cart } from './pages/cart/cart';
import { NotFound } from './pages/not-found/not-found';
import { Product } from './pages/product/product';
import { ProductForm } from './pages/product-form/product-form';
import { ClientForm } from './pages/client-form/client-form';

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
    path: 'new/product',
    component: ProductForm,
  },
  {
    path: 'product/edit/:id',
    component: ProductForm,
  },
  {
    path: 'new/client',
    component: ClientForm,
  },
  { 
    path: '**', 
    redirectTo: '404',
  },
  { 
    path: '404', 
    component: NotFound,
  }
];
