import { Component, OnInit } from '@angular/core';
import { CoursService, Cours } from '../../../services/cours.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cours-list',
  templateUrl: './cours-list.component.html',
})
export class CoursListComponent implements OnInit {

  coursList: Cours[] = [];
  isLoading: boolean = true; // ✅ Ajouter cette ligne

  constructor(private coursService: CoursService, private router: Router) {}

  ngOnInit(): void {
    this.coursService.getAll().subscribe({
      next: (data) => {
        this.coursList = data;
        this.isLoading = false; // ❗ arrêter le chargement
      },
      error: () => {
        this.isLoading = false; // ❗ même en cas d’erreur, on arrête le loading
      }
    });
  }

  voirCours(id: number) {
    this.router.navigate(['/dashboard-enseignant/mes-cours', id]);
  }
}
