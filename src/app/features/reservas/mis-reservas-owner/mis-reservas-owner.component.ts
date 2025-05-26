import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../../core/services/reserva.service';
import { AuthService } from '../../../core/services/auth.service';
import { DatePipe, CommonModule } from '@angular/common'; // <-- Importa aquí

@Component({
  selector: 'app-mis-reservas-owner',
  standalone: true,
   imports: [
    CommonModule,
    DatePipe // <-- AÑADE ESTA LÍNEA
  ],
  templateUrl: './mis-reservas-owner.component.html',
  styleUrls: ['./mis-reservas-owner.component.scss']
})
export class MisReservasOwnerComponent implements OnInit {
  reservas: any[] = [];
  restauranteId: number | null = null;
  error: string | null = null;

  constructor(
    private reservaService: ReservaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.restauranteId = this.authService.getRestauranteId();
    if (this.restauranteId) {
      this.reservaService.getReservasByRestaurante(this.restauranteId).subscribe({
        next: (data) => this.reservas = data,
        error: () => this.error = 'No se pudieron cargar las reservas.'
      });
    } else {
      this.error = 'No se ha encontrado un restaurante asociado a este usuario.';
    }
  }
}
