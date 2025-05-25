import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/enviroments';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ReservaService {
  private readonly baseUrl = `${environment.apiUrl}/reservas`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  crearReserva(data: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(this.baseUrl, data, { headers });
  }

  getMisReservas(): Observable<any[]> {
  const token = this.authService.getToken();
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this.http.get<any[]>(`${this.baseUrl}/mis`, { headers });
}

borrarReserva(id: number): Observable<any> {
  const token = this.authService.getToken();
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this.http.delete(`${this.baseUrl}/${id}`, { headers });
}


}
