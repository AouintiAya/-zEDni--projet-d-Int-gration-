import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // 🔹 Getters pour accéder aux champs sans erreurs TypeScript
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  login() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    this.auth.login(email, password).subscribe(success => {
      if (success) {
        this.router.navigate(['/dashboard']); // redirection après connexion
      } else {
        this.errorMessage = 'Email ou mot de passe incorrect';
      }
    });
  }
}
