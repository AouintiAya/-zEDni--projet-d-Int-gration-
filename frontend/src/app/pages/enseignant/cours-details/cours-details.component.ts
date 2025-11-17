import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursService, Cours } from '../../../services/cours.service';
import { RessourceService, Ressource } from '../../../services/ressource.service';

@Component({
  selector: 'app-cours-details',
  templateUrl: './cours-details.component.html',
})
export class CoursDetailsComponent implements OnInit {

  cours: Cours | null = null;
  ressources: Ressource[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursService: CoursService,
    private ressourceService: RessourceService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];

    // 🔹 Récupérer le cours par ID
    this.coursService.getById(id).subscribe({
      next: (data) => {
        this.cours = data;
      },
      error: (err) => console.error('Erreur récupération cours', err)
    });

    // 🔹 Récupérer les ressources du cours
    this.ressourceService.getByCours(id).subscribe({
      next: (data) => {
        this.ressources = data;
      },
      error: (err) => console.error('Erreur récupération ressources', err)
    });
  }

  addRessource() {
    if (this.cours) {
      this.router.navigate([`/dashboard-enseignant/cours/${this.cours.id}/add-ressource`]);
    }
  }

  deleteRessource(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cette ressource ?')) {
      this.ressourceService.delete(id).subscribe({
        next: () => {
          this.ressources = this.ressources.filter(r => r.id !== id);
          alert('Ressource supprimée avec succès !');
        },
        error: (err) => alert('Erreur lors de la suppression')
      });
    }
  }
}
