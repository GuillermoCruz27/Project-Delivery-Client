# 🚀 Project Delivery - Client

Una aplicación de e-commerce moderna desarrollada con Angular 19, diseñada para ofrecer una experiencia de compra rápida y eficiente con funcionalidades avanzadas de búsqueda y gestión de productos.

![Angular](https://img.shields.io/badge/Angular-19.0.0-dd0031?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178c6?style=flat-square&logo=typescript)
![Material](https://img.shields.io/badge/Angular%20Material-20.0.2-673ab7?style=flat-square&logo=material-design)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.7-7952b3?style=flat-square&logo=bootstrap)

## 📋 Tabla de Contenidos

- [🎯 Características Principales](#-características-principales)
- [🛠️ Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🚀 Instalación y Configuración](#-instalación-y-configuración)
- [💻 Comandos de Desarrollo](#-comandos-de-desarrollo)
- [🔧 Configuración del Entorno](#-configuración-del-entorno)
- [📱 Funcionalidades](#-funcionalidades)
- [🏗️ Arquitectura](#️-arquitectura)
- [🔍 Sistema de Búsqueda](#-sistema-de-búsqueda)
- [📦 Componentes Principales](#-componentes-principales)
- [🌐 API y Servicios](#-api-y-servicios)
- [🎨 Estilos y UI/UX](#-estilos-y-uiux)
- [🧪 Testing](#-testing)
- [📚 Recursos Adicionales](#-recursos-adicionales)

## 🎯 Características Principales

✨ **Búsqueda Inteligente en Tiempo Real**

- Filtrado instantáneo mientras el usuario escribe
- Búsqueda por nombre, descripción y categoría
- Algoritmo de coincidencia avanzado (exacta, inicio de palabra, múltiples términos)
- Fallback automático si la API no está disponible

🛒 **Gestión de Productos**

- Visualización de productos con cards interactivas
- Filtrado por categorías
- Detalles completos de productos
- Integración con MercadoPago

🎯 **Experiencia de Usuario Optimizada**

- Diseño responsive para todos los dispositivos
- Loading states y feedback visual
- Navegación intuitiva
- Estados informativos (búsqueda activa, resultados vacíos)

🔧 **Arquitectura Robusta**

- Arquitectura de componentes modulares
- Servicios reactivos con RxJS
- Manejo de errores profesional
- Código TypeScript estrictamente tipado

## 🛠️ Tecnologías Utilizadas

### Frontend Core

- **Angular 19.0.0** - Framework principal
- **TypeScript 5.8.2** - Lenguaje de programación
- **RxJS 7.8.0** - Programación reactiva

### UI/UX

- **Angular Material 20.0.2** - Componentes UI
- **Bootstrap 5.3.7** - Sistema de diseño y layout
- **Material Icons** - Iconografía

### Herramientas de Desarrollo

- **Angular CLI 20.0.1** - Herramientas de desarrollo
- **Karma** - Test runner
- **Jasmine** - Framework de testing

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/          # Componentes reutilizables
│   │   ├── navbar/         # Barra de navegación con búsqueda
│   │   ├── footer/         # Pie de página
│   │   ├── categories/     # Filtro de categorías
│   │   ├── product-card/   # Tarjeta de producto
│   │   ├── product-list/   # Lista de productos
│   │   ├── product-detail/ # Detalle de producto
│   │   ├── cart/          # Carrito de compras
│   │   └── checkout/      # Proceso de pago
│   ├── pages/             # Páginas principales
│   │   ├── home/          # Página principal
│   │   ├── shop/          # Tienda
│   │   ├── login/         # Autenticación
│   │   ├── cart/          # Carrito
│   │   ├── checkout/      # Checkout
│   │   └── not-found/     # 404
│   ├── services/          # Servicios de datos
│   │   ├── product.service.ts    # Gestión de productos
│   │   └── cart.service.ts       # Gestión del carrito
│   ├── models/            # Interfaces y tipos
│   │   └── product.model.ts      # Modelo de producto
│   └── environments/      # Configuraciones de entorno
├── public/               # Recursos estáticos
└── styles.css           # Estilos globales
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Node.js** (versión 18 o superior)
- **npm** (versión 8 o superior)
- **Angular CLI** (versión 20 o superior)

### Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/GuillermoCruz27/Project-Delivery---Client.git
cd project-delivery-client
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  API_URL: "https://api.escuelajs.co/api/v1",
  API_LOCAL: "http://localhost:3000/api",
};
```

4. **Iniciar servidor de desarrollo**

```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`

## 💻 Comandos de Desarrollo

### Servidor de desarrollo

```bash
ng serve                    # Servidor básico
ng serve --open            # Abrir automáticamente en el navegador
ng serve --port 4300       # Cambiar puerto
```

### Construcción

```bash
ng build                   # Build de desarrollo
ng build --prod           # Build de producción
ng build --watch          # Build con watch mode
```

### Testing

```bash
ng test                    # Ejecutar tests unitarios
ng test --watch=false     # Ejecutar tests una vez
ng e2e                    # Tests end-to-end
```

### Generación de código

```bash
ng generate component mi-componente      # Nuevo componente
ng generate service mi-servicio         # Nuevo servicio
ng generate pipe mi-pipe               # Nuevo pipe
ng generate directive mi-directiva     # Nueva directiva
```

### Análisis y linting

```bash
ng lint                    # Análisis de código
ng build --stats-json     # Análisis del bundle
```

## 🔧 Configuración del Entorno

### Variables de Entorno

**Desarrollo** (`environment.ts`)

```typescript
export const environment = {
  production: false,
  API_URL: "https://api.escuelajs.co/api/v1",
  API_LOCAL: "http://localhost:3000/api",
};
```

**Producción** (`environment.prod.ts`)

```typescript
export const environment = {
  production: true,
  API_URL: "https://api.production.com/api/v1",
  API_LOCAL: "https://api.production.com/api",
};
```

### Configuración de Angular Material

El proyecto está configurado con Angular Material con temas personalizados:

```typescript
// app.config.ts
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    // ... otros providers
  ],
};
```

## 📱 Funcionalidades

### 🔍 Sistema de Búsqueda Avanzado

**Características:**

- **Búsqueda en tiempo real** con debounce de 150ms
- **Múltiples criterios**: nombre, descripción, categoría
- **Algoritmo inteligente** con 3 niveles de coincidencia:
  1. Coincidencia exacta
  2. Inicio de palabras ("pi" → "pizza")
  3. Múltiples términos ("pizza mar" → "Pizza Margarita")
- **Fallback robusto** a búsqueda local si la API falla
- **Indicadores visuales** de estado y resultados

**Implementación técnica:**

```typescript
// Búsqueda reactiva con RxJS
this.searchControl.valueChanges.pipe(debounceTime(150), distinctUntilChanged()).subscribe((searchTerm) => {
  this.performSearch(searchTerm);
});
```

### 🛒 Gestión de Productos

- **Visualización en cards** con información completa
- **Filtrado por categorías** dinámico
- **Detalles expandidos** de cada producto
- **Integración con carrito** de compras
- **Links a MercadoPago** para pagos

### 🎯 Navegación y Routing

- **Routing configurado** para todas las páginas
- **Navegación responsive** con menú hamburguesa
- **Estados activos** en la navegación
- **Página 404** personalizada

## 🏗️ Arquitectura

### Patrón de Arquitectura

El proyecto sigue una **arquitectura de componentes modulares** con:

1. **Separación de responsabilidades**

   - Componentes para la presentación
   - Servicios para la lógica de negocio
   - Modelos para la tipificación de datos

2. **Comunicación reactiva**

   - BehaviorSubject para estado compartido
   - Observables para flujo de datos
   - Event emitters para comunicación entre componentes

3. **Inyección de dependencias**
   - Servicios singleton
   - Providers configurados en app.config.ts

### Flujo de Datos

```
Usuario escribe en Navbar →
ProductService (BehaviorSubject) →
Home Component →
ProductList Component →
ProductCard Components
```

## 🔍 Sistema de Búsqueda

### Algoritmo de Búsqueda

```typescript
private filterProductsLocally(searchTerm: string): void {
  const term = searchTerm.toLowerCase().trim();

  this.products = this.allProducts.filter(product => {
    // 1. Coincidencia exacta (mayor prioridad)
    const exactMatch = nombre.includes(term) ||
                      descripcion.includes(term) ||
                      categoria.includes(term);

    // 2. Inicio de palabras (para búsquedas parciales)
    const wordsMatch = this.matchesWordStart(nombre, term);

    // 3. Múltiples palabras
    const multiWordMatch = this.matchesMultipleWords(fullText, term);

    return exactMatch || wordsMatch || multiWordMatch;
  });
}
```

### Estrategia de Fallback

```typescript
searchProducts(searchTerm: string): Observable<Producto[]> {
  return this.http.get(`${this.apiUrlLocal}/buscar?q=${searchTerm}`)
    .pipe(
      map(res => res.data),
      catchError(() => this.searchProductsLocally(searchTerm)) // Fallback
    );
}
```

## 📦 Componentes Principales

### Navbar Component

- **Búsqueda reactiva** con FormControl
- **Navegación responsive**
- **Estados de autenticación**

### Home Component

- **Gestión de estado** de productos
- **Filtrado por categorías**
- **Indicadores de búsqueda**

### ProductList Component

- **Renderizado de lista** optimizado
- **Props drilling** controlado
- **Estados de carga**

### ProductCard Component

- **Información del producto**
- **Acciones de carrito**
- **Navegación a detalles**

## 🌐 API y Servicios

### ProductService

**Métodos principales:**

```typescript
class ProductService {
  // Obtener todos los productos
  getProducts(): Observable<Producto[]>;

  // Filtrar por categorías
  getProductsByCategorias(categorias: number[]): Observable<Producto[]>;

  // Buscar productos (con fallback)
  searchProducts(searchTerm: string): Observable<Producto[]>;

  // Búsqueda local
  searchProductsLocally(searchTerm: string): Observable<Producto[]>;

  // Gestión de término de búsqueda
  updateSearchTerm(searchTerm: string): void;
  getCurrentSearchTerm(): string;
}
```

### Interfaces y Modelos

```typescript
interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen_url: string;
  mercadoPagoLink: string;
  categoria?: { id: number; nombre: string };
}
```

## 🎨 Estilos y UI/UX

### Sistema de Diseño

- **Bootstrap 5.3.7** para layout y utilidades
- **Angular Material 20.0.2** para componentes
- **Material Icons** para iconografía
- **CSS custom** para estilos específicos

### Responsive Design

```css
/* Mobile First Approach */
@media (max-width: 900px) {
  .navbar-col-center {
    display: none;
  }
  .navbar-actions {
    display: none;
  }
  .nav-toggle-label {
    display: flex;
  }
}
```

### Temas y Colores

- **Primary**: Material Blue (#007bff)
- **Secondary**: Bootstrap Gray
- **Success**: Green (#28a745)
- **Warning**: Orange (#ffc107)
- **Danger**: Red (#dc3545)

## 🧪 Testing

### Configuración de Tests

El proyecto está configurado con:

- **Karma** como test runner
- **Jasmine** como framework de testing
- **ChromeHeadless** para ejecución en CI/CD

### Ejecutar Tests

```bash
# Tests unitarios
ng test

# Tests con coverage
ng test --code-coverage

# Tests en modo CI
ng test --watch=false --browsers=ChromeHeadless
```

### Estructura de Tests

```
src/
├── app/
│   ├── components/
│   │   └── navbar/
│   │       ├── navbar.component.ts
│   │       └── navbar.component.spec.ts
│   └── services/
│       ├── product.service.ts
│       └── product.service.spec.ts
```

## 📚 Recursos Adicionales

### Documentación Oficial

- [Angular Documentation](https://angular.dev)
- [Angular Material](https://material.angular.io)
- [Bootstrap Documentation](https://getbootstrap.com)
- [RxJS Documentation](https://rxjs.dev)

### Comandos Útiles de Angular CLI

```bash
# Información del proyecto
ng version

# Análisis del bundle
ng build --stats-json
npx webpack-bundle-analyzer dist/project-delivery-client/stats.json

# Actualizar dependencias
ng update

# Información detallada de comandos
ng help
ng generate --help
```

### Mejores Prácticas Implementadas

1. **TypeScript Strict Mode** - Tipado estricto
2. **OnPush Change Detection** - Optimización de performance
3. **Lazy Loading** - Carga diferida de módulos
4. **Service Workers** - PWA capabilities
5. **Tree Shaking** - Eliminación de código no utilizado
6. **Code Splitting** - División automática del código

---

## 👥 Contribuciones

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más información.

---

⭐ **¡No olvides dar una estrella al proyecto si te fue útil!**
