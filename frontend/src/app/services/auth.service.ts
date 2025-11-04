import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  // 🔹 Sauvegarde uniforme
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  // 🔹 Décodage du JWT
  getUserInfo(): any {
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

  // 🔹 Vérifie la validité du token
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      const exp = decoded.exp * 1000;
      return Date.now() < exp;
    } catch {
      return false;
    }
  }
}
