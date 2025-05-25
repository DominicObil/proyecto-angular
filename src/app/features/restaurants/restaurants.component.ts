import { Component, Signal, computed, effect, signal } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RestaurantService } from '../../core/services/restaurant.service';
import { RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    JsonPipe, 
    AsyncPipe,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent {
  restaurantes = signal<any[]>([]);
  filtro = new FormControl('');
  error = signal<string | null>(null);

  
  constructor(
    private restaurantService: RestaurantService,
    private router: Router // ← ESTA LÍNEA FALTABA
  ) {
    this.loadData();
    this.setupFiltro();
  }
  

  private loadData(): void {
    this.restaurantService.fetchRestaurants(0, 100, 'nombre', 'asc').subscribe({
      next: (res) => {
        console.log('📦 Respuesta de restaurantes:', res);
        this.restaurantes.set(res.content);
        this.error.set(null);
      },
      error: (err) => {
        this.error.set('Error al cargar restaurantes');
        console.error(err);
      }
    });
  }

  filteredData: Signal<any[]> = computed(() => {
    const term = this.filtro.value?.toLowerCase() || '';
    return this.restaurantes().filter(r =>
      r.nombre.toLowerCase().includes(term) || r.direccion.toLowerCase().includes(term)
    );
  });

  private setupFiltro(): void {
    this.filtro.valueChanges.pipe(debounceTime(300)).subscribe();
  }

  goToReservaForm(restauranteId: number) {
    this.router.navigate(['/reservar', restauranteId]);
  
  }
  
}
