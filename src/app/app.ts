import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { Navbar } from './components/navbar/navbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar, CommonModule],
  templateUrl: './app.html',
})
export class App {
  protected title = 'project-delivery-client';

  constructor(public router: Router) {}

  hideLayoutRoutes: string[] = ['/404'];
}
