import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../../core/services/reserva.service';
import { ActivatedRoute, Router } from '@angular/router'; // <-- Importa Router
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservas-por-restaurante',
  standalone: true,
  templateUrl: './reservas-por-restaurante.component.html',
  styleUrls: ['./reservas-por-restaurante.component.scss'],
  imports: [CommonModule]
})
export class ReservasPorRestauranteComponent implements OnInit {
  reservas: any[] = [];
  loading = true;
  error: string | null = null;
  restauranteId!: number;

  constructor(
    private reservaService: ReservaService,
    private route: ActivatedRoute,
    private router: Router // <-- Añade el Router aquí
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit lanzado');
    this.route.paramMap.subscribe(params => {
      this.restauranteId = Number(params.get('restauranteId'));
      console.log('restauranteId recibido:', this.restauranteId);
      if (this.restauranteId) {
        this.reservaService.getReservasPorRestaurante(this.restauranteId).subscribe({
          next: (data) => {
            console.log('Reservas recibidas:', data);
            this.reservas = data;
            this.loading = false;
          },
          error: (err) => {
            console.error('Error en getReservasPorRestaurante:', err);
            this.error = 'Error al cargar reservas';
            this.loading = false;
          }
        });
      } else {
        this.error = 'No se proporcionó el ID del restaurante';
        this.loading = false;
      }
    });
  }

  irAEditar(reservaId: number) {
    this.router.navigate(['/editar-reserva', reservaId]);
  }

  borrarReserva(reservaId: number) {
    if (confirm('¿Seguro que quieres borrar esta reserva?')) {
      this.reservaService.borrarReserva(reservaId).subscribe({
        next: () => this.reservas = this.reservas.filter(r => r.id !== reservaId),
        error: () => alert('No se pudo borrar la reserva')
      });
    }
  }
  
}
