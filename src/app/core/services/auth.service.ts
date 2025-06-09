import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Realiza una solicitud de autenticación al backend.
   * @param username - Nombre de usuario
   * @param password - Contraseña
   * @returns Observable con el token
   */
  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${environment.apiUrl}/v1/authenticate`,
      { username, password },
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  /**
   * Almacena el token en memoria y en localStorage.
   * @param token - JWT recibido del backend
   */
  setToken(token: string): void {
    this.token.next(token);
    localStorage.setItem('token', token); // ⬅️ guarda en el navegador
  }

  /**
   * Devuelve el token desde memoria o desde localStorage.
   * @returns Token o null
   */
  getToken(): string | null {
    const current = this.token.value;
    if (current) return current;

    const stored = localStorage.getItem('token');
    if (stored) {
      this.token.next(stored);
      return stored;
    }

    return null;
  }

  /**
   * Devuelve un observable con el estado de autenticación.
   */
  isLoggedIn(): Observable<boolean> {
    return this.token.asObservable().pipe(
      map((token: string | null) => !!token)
    );
  }

  /**
   * Limpia el token y redirige al inicio.
   */
  logout(): void {
    this.token.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  getRestauranteId(): string {
  // Devuelve un valor temporal o real
  return 'id-fake'; // Cambia esto por la lógica real si la tienes
}


 

}
