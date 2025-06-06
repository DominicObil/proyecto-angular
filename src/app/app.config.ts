import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Importa HttpClient

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // Proporciona las rutas de la aplicación
    provideClientHydration(withEventReplay()), // Habilita la hidratación del cliente
    provideHttpClient(), provideAnimationsAsync(), provideAnimationsAsync(), // Proveedor de HttpClient para toda la aplicación
  ],
};
