import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email = '';
  otp = '';
  newPassword = '';

  step = 1; // 1: email, 2: otp, 3: new password
  message = '';
  error = '';

  constructor(private authService: AuthService) {}

  // Étape 1 : envoyer le code OTP
  onSubmitEmail() {
    this.authService.sendOtp(this.email).subscribe({
      next: () => {
        this.error = '';
        this.message = 'Un code a été envoyé à votre adresse email.';
        this.step = 2;
      },
      error: (err) => {
        this.error = err.error || "Email introuvable dans notre base de données.";
      }
    });
  }

  // Étape 2 : vérifier le code
  onSubmitCode() {
    this.authService.verifyOtp(this.email, this.otp).subscribe({
      next: () => {
        this.error = '';
        this.message = 'Code vérifié. Vous pouvez maintenant définir un nouveau mot de passe.';
        this.step = 3;
      },
      error: (err) => {
        this.error = err.error || 'Code incorrect ou expiré.';
      }
    });
  }

  // Étape 3 : réinitialiser le mot de passe
  onSubmitPassword() {
    this.authService.resetPassword(this.email, this.otp, this.newPassword).subscribe({
      next: () => {
        this.message = 'Mot de passe réinitialisé avec succès !';
        this.error = '';
        this.step = 1;
        this.email = this.otp = this.newPassword = '';
      },
      error: (err) => {
        this.error = err.error || 'Erreur lors de la réinitialisation du mot de passe.';
      }
    });
  }
}
