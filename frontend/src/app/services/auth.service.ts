import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: { email: string, password: string }[] = [];
  private isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor() { }

  // Créer un compte
  register(email: string, password: string): Observable<boolean> {
    const exists = this.users.find(u => u.email === email);
    if (exists) {
      return of(false); // utilisateur existe déjà
    }
    this.users.push({ email, password });
    return of(true);
  }

  // Connexion
  login(email: string, password: string): Observable<boolean> {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.isLoggedIn.next(true);
      return of(true);
    }
    return of(false);
  }

  // Vérifier état de connexion
  getAuthStatus(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  logout() {
    this.isLoggedIn.next(false);
  }
}
