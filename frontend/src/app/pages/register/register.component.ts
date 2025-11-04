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
    this.registerForm = this.fb.group(
      {
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        telephone: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
        role: ['', Validators.required],
        profCode: ['']
      },
      { validators: this.passwordMatchValidator }
    );
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get telephone() {
    return this.registerForm.get('telephone');
  }

  get profCode() {
    return this.registerForm.get('profCode');
  }

  passwordMatchValidator(group: AbstractControl) {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;

  if (password !== confirm) {
    group.get('confirmPassword')?.setErrors({ passwordMismatch: true });
  } else {
    group.get('confirmPassword')?.setErrors(null);
  }
  return null; // important pour que le FormGroup soit considéré valide
}

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

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.successMessage = 'Inscription réussie !';
        this.errorMessage = '';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de l’inscription.';
        this.successMessage = '';
      }
    });
  }
}
