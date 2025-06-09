import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router'; // <-- Importa Router aquí
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  menuOpen = false;

  private subscription: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private router: Router // <-- Inyecta el Router aquí
  ) {}

  ngOnInit() {
    this.subscription = this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // <-- Redirecciona a login después de logout
  }

  irALogin() {
    this.router.navigate(['/login']);
  }

  irARegistro() {
    this.router.navigate(['/register']); // Ajusta la ruta si es diferente en tu app
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
