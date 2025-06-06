import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ReservaService } from '../../../core/services/reserva.service';
import { RestaurantService } from '../../../core/services/restaurant.service'; // <-- Importa tu service de restaurantes
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reserva-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './reserva-form.component.html',
  styleUrls: ['./reserva-form.component.scss']
})
export class ReservaFormComponent implements OnInit {
  form: FormGroup;
  restauranteNombre: string = '';
  restauranteId: number | null = null;

  private reservaService = inject(ReservaService);
  private restaurantService = inject(RestaurantService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fechaReserva: ['', Validators.required],
      horaReserva: ['', Validators.required],
      numeroPersonas: [1, [Validators.required, Validators.min(1)]],
      comentarios: [''],
      turnoId: [null, Validators.required],
      restauranteId: [{ value: null, disabled: true }, Validators.required], // Disabled para que no lo cambien
    });
  }

  ngOnInit(): void {
    const restauranteId = this.route.snapshot.paramMap.get('restauranteId');
    if (restauranteId) {
      this.restauranteId = Number(restauranteId);
      this.form.patchValue({ restauranteId: this.restauranteId });

      // Obtener el nombre del restaurante y mostrarlo
      this.restaurantService.fetchRestaurantById(this.restauranteId).subscribe({
        next: (restaurante) => {
          this.restauranteNombre = restaurante.nombre;
        },
        error: () => {
          this.restauranteNombre = 'Restaurante no encontrado';
        }
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      // getRawValue para incluir los valores disabled
      const data = this.form.getRawValue();
      this.reservaService.crearReserva(data).subscribe({
        next: () => this.router.navigate(['/mis-reservas']),
        error: (err) => console.error('❌ Error al crear reserva', err),
      });
    }
  }
}
