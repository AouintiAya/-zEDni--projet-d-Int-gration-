import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profil-enseignant.component.html',
  styleUrls: ['./profil-enseignant.component.css']
})
export class ProfilEnseignantComponent implements OnInit {

  profileForm!: FormGroup;
  userData: any;
  isEditing = false;
  message = '';
  error = '';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loadFakeUser();
  }

  loadFakeUser() {
    this.userData = {
      username: 'Meriem',
      email: 'meriem@gmail.com',
      phone: '00000000',
      role: 'Utilisateur'
    };

    this.profileForm = this.fb.group({
      username: [this.userData.username],
      email: [this.userData.email],
      role: [this.userData.role],
      phone: [this.userData.phone]
    });
  }

  enableEdit() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
    this.profileForm.patchValue(this.userData);
  }

  saveProfile() {
    this.userData = this.profileForm.value;
    this.isEditing = false;
    this.message = "Profil mis à jour (simulation locale).";
  }

}
