import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../../core/services/restaurant.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurants-list',
  standalone: true,
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.scss'],
  imports: [CommonModule]
})
export class RestaurantsListComponent implements OnInit {
  restaurantes: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.restaurantService.getMisRestaurantes().subscribe({
      next: (data) => {
        this.restaurantes = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar restaurantes';
        this.loading = false;
      }
    });
  }

  irAReservas(restauranteId: number) {
    this.router.navigate(['/reservas-restaurante', restauranteId]);
  }
}
