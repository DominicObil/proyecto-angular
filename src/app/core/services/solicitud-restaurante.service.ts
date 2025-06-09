import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/enviroments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SolicitudRestauranteService {
  private readonly baseUrl = `${environment.apiUrl}/solicitudes-restaurante`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  crearSolicitud(data: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.baseUrl, data, { headers });
  
  
  }


  getSolicitudes(): Observable<any[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<any[]>(this.baseUrl, { headers });
  }

  /** Aprueba una solicitud (crea el restaurante real para ese owner) */
  aprobarSolicitud(id: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post(`${this.baseUrl}/${id}/aprobar`, {}, { headers });
  }

  /** Rechaza o elimina la solicitud */
  rechazarSolicitud(id: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }

}
