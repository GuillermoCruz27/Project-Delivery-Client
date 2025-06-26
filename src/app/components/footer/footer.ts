import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

interface SocialLink {
  name: string;
  icon: string;
  url: string;
  color: string;
}

interface QuickLink {
  name: string;
  url: string;
  icon?: string;
}

@Component({
  selector: 'app-footer',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatIconModule,
  ],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class Footer {
  currentYear = new Date().getFullYear();

  socialLinks: SocialLink[] = [
    { name: 'Facebook', icon: 'facebook', url: '#', color: '#1877f2' },
    { name: 'Instagram', icon: 'camera_alt', url: '#', color: '#e4405f' },
    { name: 'Twitter', icon: 'alternate_email', url: '#', color: '#1da1f2' },
    { name: 'WhatsApp', icon: 'chat', url: '#', color: '#25d366' },
  ];

  quickLinks: QuickLink[] = [
    { name: 'Sobre Nosotros', url: '/about', icon: 'info' },
    { name: 'Cómo Funciona', url: '/how-it-works', icon: 'help' },
    { name: 'Términos y Condiciones', url: '/terms', icon: 'description' },
    { name: 'Política de Privacidad', url: '/privacy', icon: 'privacy_tip' },
    { name: 'Contacto', url: '/contact', icon: 'contact_support' },
  ];

  supportLinks: QuickLink[] = [
    { name: 'Centro de Ayuda', url: '/help', icon: 'support_agent' },
    { name: 'Preguntas Frecuentes', url: '/faq', icon: 'quiz' },
    { name: 'Reportar Problema', url: '/report', icon: 'report_problem' },
    { name: 'Sugerencias', url: '/feedback', icon: 'feedback' },
  ];

  constructor() {}

  onSocialClick(social: SocialLink): void {
    // Aquí puedes agregar tracking de analytics
    console.log(`Clicked on ${social.name}`);
    window.open(social.url, '_blank');
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
