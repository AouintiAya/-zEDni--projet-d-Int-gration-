import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

 onSubmit() {
  if (this.loginForm.invalid) {
    this.errorMessage = 'Veuillez remplir correctement tous les champs.';
    return;
  }

  this.authService.login(this.loginForm.value).subscribe({
    next: (token: string) => {
      if (token) {
        // Sauvegarde du token dans le localStorage
        this.authService.saveToken(token);

        // Décodage du token JWT
        const decoded: any = jwtDecode(token);
        console.log(decoded);

        // Récupération du rôle
        const role = decoded.role?.toUpperCase();

        // Redirection selon le rôle
        if (role === 'ROLE_ENSEIGNANT') {
          this.router.navigate(['/dashboard-enseignant']);
        } else if (role === 'ROLE_ETUDIANT') {
          this.router.navigate(['/dashboard-etudiant']);
        } else {
          this.router.navigate(['/']); // redirection par défaut
        }
      } else {
        this.errorMessage = 'Token non trouvé.';
      }
    },
    error: (err) => {
      console.error('Erreur login', err);
      this.errorMessage = 'Email ou mot de passe incorrect.';
    }
  });
}
}
