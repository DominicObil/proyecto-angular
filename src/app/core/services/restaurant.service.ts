import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private readonly baseUrl = `${environment.apiUrl}/restaurantes`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  /**
   * Obtiene la lista paginada y ordenada de restaurantes desde la API.
   */
  fetchRestaurants(
    page: number,
    size: number,
    sort: string,
    dir: 'asc' | 'desc'
  ): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const params = {
      page: page.toString(),
      size: size.toString(),
      sort: `${sort},${dir}`,
    };

    return this.http.get(this.baseUrl, { headers, params });
  }
  fetchRestaurantById(id: number): Observable<any> {
  const token = this.authService.getToken();
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });
  return this.http.get(`${this.baseUrl}/${id}`, { headers });
}

}
