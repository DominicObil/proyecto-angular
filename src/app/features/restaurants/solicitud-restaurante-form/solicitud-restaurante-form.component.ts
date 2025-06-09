import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SolicitudRestauranteService } from '../../../core/services/solicitud-restaurante.service';

@Component({
  selector: 'app-solicitud-restaurante-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './solicitud-restaurante-form.component.html',
  styleUrls: ['./solicitud-restaurante-form.component.scss'],
})
export class SolicitudRestauranteFormComponent {
  form: FormGroup;
  loading = false;
  success: string | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private solicitudService: SolicitudRestauranteService
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      direccion: ['', [Validators.required, Validators.maxLength(200)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      capacidad: [1, [Validators.required, Validators.min(1)]],
      // ownerId se mete en el service usando el usuario logueado
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.success = null;
    this.error = null;

    this.solicitudService.crearSolicitud(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        this.success = '¡Solicitud enviada correctamente!';
        this.form.reset();
        setTimeout(() => this.router.navigate(['/']), 1200);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || '!Solicitud enviada correctamente!';
      },
    });
  }
}
