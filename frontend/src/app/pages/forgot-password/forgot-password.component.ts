import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(
    private authService: AuthService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  // Étape 1 : envoyer le code OTP
  onSubmitEmail() {
    this.authService.sendOtp(this.email).subscribe({
      next: (res: any) => {
        this.error = '';
        this.message = res.text || 'Un code a été envoyé à votre adresse email.';
        this.step = 2;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.error = err.error?.text || "Email introuvable dans notre base de données.";
      }
    });
  }

  // Étape 2 : vérifier le code OTP
  onSubmitCode() {
    this.authService.verifyOtp(this.email, this.otp).subscribe({
      next: (res: any) => {
        this.error = '';
        this.message = res.text || 'Code vérifié. Vous pouvez maintenant définir un nouveau mot de passe.';
        this.step = 3;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.error = err.error?.text || 'Code incorrect ou expiré.';
      }
    });
  }

  // Étape 3 : réinitialiser le mot de passe
  onSubmitPassword() {
  this.authService.resetPassword(this.email, this.otp, this.newPassword).subscribe({
    next: (res: any) => {
      this.message = res.text || 'Mot de passe réinitialisé avec succès !';
      this.error = '';

      // Attendre un petit délai pour montrer le message avant la redirection
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    },
    error: (err) => {
      this.error = err.error?.text || 'Erreur lors de la réinitialisation du mot de passe.';
    }
  });
}
}
