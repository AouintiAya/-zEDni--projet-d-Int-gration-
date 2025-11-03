import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  showProfCode = false;
  successMessage = '';
  errorMessage = '';


  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
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

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  onRoleChange() {
    const role = this.registerForm.get('role')?.value;
    this.showProfCode = role === 'enseignant';

    if (this.showProfCode) {
      this.registerForm.get('profCode')?.setValidators([Validators.required]);
    } else {
      this.registerForm.get('profCode')?.clearValidators();
      this.registerForm.get('profCode')?.setValue('');
    }
    this.registerForm.get('profCode')?.updateValueAndValidity();
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.registerForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
      return;
    }

    const role = this.registerForm.get('role')?.value;
    const profCode = this.registerForm.get('profCode')?.value;

    if (role === 'enseignant' && profCode !== 'CODEPROF123') {
      this.errorMessage = 'Code enseignant invalide.';
      return;
    }

    this.successMessage = 'Inscription réussie !';
    console.log(this.registerForm.value);
    this.registerForm.reset();
    this.showProfCode = false;
  }

  // Getters pour le template
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get cin() { return this.registerForm.get('cin'); }
  get telephone() { return this.registerForm.get('telephone'); }
  get profCode() { return this.registerForm.get('profCode'); }
}
