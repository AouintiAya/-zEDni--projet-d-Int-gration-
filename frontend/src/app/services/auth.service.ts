import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) {}

  register(data: any): Observable<string> {
  return this.http.post(`${this.apiUrl}/register`, data, { responseType: 'text' });
}


login(data: any): Observable<string> {
  return this.http.post(`${this.apiUrl}/login`, data, { responseType: 'text' });
}

  saveToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  logout() {
    localStorage.removeItem('jwtToken');
  }
  getUserInfo() {
  const token = this.getToken();
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    return decoded; // { sub: 'email', role: 'ROLE_ENSEIGNANT', ... }
  } catch (e) {
    console.error('Erreur lors du décodage du token', e);
    return null;
  }
}
}
