import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth';
  private loggedIn = new BehaviorSubject<boolean>(this.hasValidToken()); // ✅

  constructor(private http: HttpClient) {}

  register(data: any): Observable<string> {
    return this.http.post(`${this.apiUrl}/register`, data, { responseType: 'text' });
  }

  login(data: any): Observable<string> {
    return this.http.post(`${this.apiUrl}/login`, data, { responseType: 'text' });
  }
  getUserInfo() {
  const token = this.getToken();
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    return decoded; // Ex: { sub: 'email@example.com', role: 'ROLE_ENSEIGNANT', exp: 1729435353 }
  } catch (e) {
    console.error('Erreur lors du décodage du token', e);
    return null;
  }
}


  saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.loggedIn.next(true); // ✅ met à jour l'état
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false); // ✅ notifie la déconnexion
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Vérifie si le token est encore valide
  private hasValidToken(): boolean {
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

  // Observable que les composants peuvent "écouter"
  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  // Permet de vérifier l’état courant sans souscription
  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }
  // Étape 1 : envoyer OTP
  sendOtp(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email }, { responseType: 'text' as 'json' });
  }

  // Étape 2 : vérifier OTP
  verifyOtp(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-otp`, { email, otp }, { responseType: 'text' as 'json' });
  }

  // Étape 3 : réinitialiser le mot de passe
  resetPassword(email: string, otp: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { email, otp, newPassword }, { responseType: 'text' as 'json' });
  }
}
