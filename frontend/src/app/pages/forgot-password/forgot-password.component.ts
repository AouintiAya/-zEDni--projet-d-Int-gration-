import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  code: string = '';
  password: string = '';

  step: number = 1; // 1=email, 2=code, 3=password

  emailError: string = '';
  codeError: string = '';
  successMessage: string = '';

  // Simulation de la "base de données"
  existingEmails = ['test@example.com', 'meriem@gmail.com'];
  sentCode: string = '123456';

  onSubmitEmail() {
    if (this.existingEmails.includes(this.email)) {
      this.emailError = '';
      this.step = 2;
      alert('Un code a été envoyé à votre adresse email.');
    } else {
      this.emailError = "Cet email n'existe pas dans notre base de données.";
    }
  }

  onSubmitCode() {
    if (this.code === this.sentCode) {
      this.codeError = '';
      this.step = 3;
    } else {
      this.codeError = 'Le code est incorrect.';
    }
  }

  onSubmitPassword() {
    this.successMessage = 'Votre mot de passe a été réinitialisé avec succès !';
    alert('Mot de passe mis à jour.');
    this.resetForm();
  }

  resetForm() {
    this.email = '';
    this.code = '';
    this.password = '';
    this.step = 1;
  }
}
