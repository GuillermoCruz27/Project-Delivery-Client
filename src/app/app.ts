import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar],
  templateUrl: './app.html',
})
export class App {
  protected title = 'project-delivery-client';
}
