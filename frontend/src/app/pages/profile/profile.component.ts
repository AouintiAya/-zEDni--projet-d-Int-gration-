import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;
  userData: any;
  isEditing = false;
  message = '';
  error = '';

  constructor(private fb: FormBuilder, private router: Router) {}

  menuItems = [
    { name: 'Tableau de bord', icon: 'fa-solid fa-home', color: '#1a3b5f', route: '/dashboard-etudiant' },
    { name: 'Cours', icon: 'fa-solid fa-book', color: '#1a3b5f', route: '/cours' },
    { name: 'Profil', icon: 'fa-solid fa-user', color: '#1a3b5f', route: '/profile' },
  ];

  isSidebarOpen = false;
  activeItem = 'Profil';

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

  setActiveItem(itemName: string, route: string): void {
    this.activeItem = itemName;
    this.router.navigate([route]);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
