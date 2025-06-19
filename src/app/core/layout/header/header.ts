import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-header',
  imports: [
    MatFormFieldModule,
    MatLabel,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './header.html',
})
export class Header {}
