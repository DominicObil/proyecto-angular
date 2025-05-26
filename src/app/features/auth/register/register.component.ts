import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from '../../../core/services/register.service'; // Ajusta el path si lo tienes diferente
import { CommonModule } from '@angular/common'; // <-- Importa esto

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  error: string | null = null;
  success: string | null = null;

  constructor(private fb: FormBuilder, private registerService: RegisterService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      image: ['']
    });
  }

  onSubmit() {
    this.success = null;
    this.error = null;
    if (this.registerForm.invalid) {
      this.error = 'Todos los campos obligatorios deben estar rellenos';
      return;
    }
    this.loading = true;
    this.registerService.register(this.registerForm.value).subscribe({
      next: () => {
        this.success = '¡Usuario registrado correctamente!';
        this.registerForm.reset();
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        // Saca mensaje entendible si existe
        this.error =
          err.error?.message ||
          err.error?.error ||
          (typeof err.error === 'string' ? err.error : null) ||
          'Error desconocido al registrar';
        console.error('Error al registrar:', err);
      }
    });
  }
}
