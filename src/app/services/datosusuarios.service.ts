import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DatosusuariosService {

  private apiUrl = '/api/datosusuarios';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getDatosUsuarios(): Observable<any[]> {
    const token = this.authService.obtenerToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(this.apiUrl, { headers });
  }
}