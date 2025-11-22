import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  constructor(private router: Router) {}

  // Redirection vers la liste des étudiants
  goToEtudiants() {
    this.router.navigate(['/dashboard-admin/liste-etudiants']);
  }

  // Redirection vers la liste des enseignants
  goToEnseignants() {
    this.router.navigate(['/dashboard-admin/liste-enseignants']);
  }

  // Redirection vers la liste des utilisateurs en attente
  goToPending() {
    this.router.navigate(['']);
  }
}
