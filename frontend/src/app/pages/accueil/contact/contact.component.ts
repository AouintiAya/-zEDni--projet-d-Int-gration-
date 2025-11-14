import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  successMessage = '';
  submitted = false; // flag pour vérifier si l'utilisateur a soumis le formulaire

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      sujet: [''],
      message: ['', Validators.required]
    });
  }

  submitForm() {
    this.submitted = true; // formulaire soumis
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      this.successMessage = "Votre message a été envoyé avec succès !";
      this.contactForm.reset();
      this.submitted = false; // reset flag après succès
    }
  }
}
