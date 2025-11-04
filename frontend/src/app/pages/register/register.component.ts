import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  showProfCode: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
      profCode: ['']
    }, { validators: this.passwordMatchValidator });
  }

  // Getters pour les contrôles
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get profCode() { return this.registerForm.get('profCode'); }

  // Validateur global pour vérifier la correspondance des mots de passe
  passwordMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;

    if (password && confirm && password !== confirm) {
      return { passwordMismatch: true };
    }
    return null;
  }

  // Affichage conditionnel du champ code enseignant
  onRoleChange() {
    const role = this.registerForm.get('role')?.value;
    this.showProfCode = role === 'enseignant';
    const profCodeControl = this.registerForm.get('profCode');

    if (this.showProfCode) {
      profCodeControl?.setValidators([Validators.required]);
    } else {
      profCodeControl?.clearValidators();
      profCodeControl?.setValue('');
    }

    profCodeControl?.updateValueAndValidity();
  }

  // Soumission du formulaire
  onSubmit() {
  if (this.registerForm.invalid) return;

  const formValue = this.registerForm.value;
  const registerData = {
    nom: formValue.nom,
    prenom: formValue.prenom,
    email: formValue.email,
    password: formValue.password,
    role: formValue.role.toUpperCase(),
    code: formValue.profCode || null
  };

  this.authService.register(registerData).subscribe({
    next: (res) => {
      this.successMessage = res; // le backend renvoie une string
      this.errorMessage = '';
      this.router.navigate(['/login']);
    },
    error: (err) => {
      // err.error contient le texte renvoyé par le backend
      if (err.error instanceof ProgressEvent) {
        this.errorMessage = 'Erreur serveur ou connexion impossible.';
      } else {
        this.errorMessage = err.error || 'Erreur lors de l’inscription.';
      }
      this.successMessage = '';
    }
  });
}
}
