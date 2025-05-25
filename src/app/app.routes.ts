import { Routes } from '@angular/router';
import { RestaurantsComponent } from './features/restaurants/restaurants.component';
import { LoginComponent } from './features/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './features/home/home.component';
import { ForbiddenComponent } from './features/forbidden/forbidden.component';
import { Error404Component } from './features/error404/error404.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'restaurants', component: RestaurantsComponent },
  {
    path: 'reservar/:restauranteId',
    loadComponent: () => import('./features/reservas/reserva-form/reserva-form.component').then(m => m.ReservaFormComponent),
    // Puedes agregar guards si lo deseas
  },
  { path: 'forbidden', component: ForbiddenComponent },
  
  { path: '**', component: Error404Component },
];