import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  role: string | null = null;
  prenom: string | null = null; // prénom de l'utilisateur
  showMenu = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Écoute l'état de connexion
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      this.updateUserFromToken();
    });

    // Initialisation au chargement de la page
    this.updateUserFromToken();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.role = null;
    this.prenom = null;
    this.showMenu = false;
    this.router.navigate(['/']);
  }

  private updateUserFromToken() {
    const userInfo = this.authService.getUserInfo();
    if (userInfo) {
      this.role = userInfo.role === 'ROLE_ENSEIGNANT' ? 'enseignant' : 'etudiant';
      this.prenom = userInfo.prenom || userInfo.sub; // utiliser prenom si présent, sinon email
    } else {
      this.role = null;
      this.prenom = null;
    }
  }
}
