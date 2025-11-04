import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) {}

  register(data: any): Observable<string> {
  return this.http.post(`${this.apiUrl}/register`, data, { responseType: 'text' });
}


  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data, { responseType: 'text' });
  }
  getUserProfile() {
  const token = this.getToken();
  return this.http.get('http://localhost:9091/api/users/me', { // <-- corrige l'URL ici
    headers: { Authorization: `Bearer ${token}` }
  });
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
}
