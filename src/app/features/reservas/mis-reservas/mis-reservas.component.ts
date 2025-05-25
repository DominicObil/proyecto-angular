import { Component, OnInit, inject } from '@angular/core';
import { ReservaService } from '../../../core/services/reserva.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.scss']
})
export class MisReservasComponent implements OnInit {
  reservas: any[] = [];
  error: string | null = null;

  private reservaService = inject(ReservaService);
  private router = inject(Router);

  ngOnInit(): void {
    this.reservaService.getMisReservas().subscribe({
      next: (res) => {
        this.reservas = res;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar las reservas';
      }
    });
  }

  editarReserva(reservaId: number) {
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
