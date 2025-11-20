import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-cours-etudiant',
  templateUrl: './page-cours-etudiant.component.html',
  styleUrls: ['./page-cours-etudiant.component.css']
})
export class PageCoursEtudiantComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    // ici on peut charger des données si nécessaire
  }

  goToMyCourses() {
    this.router.navigate(['/dashboard-etudiant/mescours']);
  }

  goToAvailableCourses() {
    this.router.navigate(['/dashboard-etudiant/coursdisponible']);
  }
}
