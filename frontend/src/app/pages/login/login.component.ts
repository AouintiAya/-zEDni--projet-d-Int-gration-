import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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
      next: (response: any) => {
        // Sauvegarde du token
        const token = response.token || response;
        this.authService.saveToken(token);

        // Récupération du profil utilisateur
        this.authService.getUserProfile().subscribe({
          next: (user: any) => {
            const role = user.role?.toUpperCase();

            if (role === 'ENSEIGNANT') {
              this.router.navigate(['/dashboard-enseignant']);
            } else if (role === 'ETUDIANT') {
              this.router.navigate(['/dashboard-etudiant']);
            } else {
              this.router.navigate(['/']); // fallback
            }
          },
          error: (err) => {
            console.error('Impossible de récupérer le profil', err);
            this.router.navigate(['/']); // fallback
          }
        });
      },
      error: (err) => {
        console.error('Erreur login', err);
        this.errorMessage = 'Email ou mot de passe incorrect';
      }
    });
  }
}
