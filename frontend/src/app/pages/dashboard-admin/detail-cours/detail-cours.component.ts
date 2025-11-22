import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-cours',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-cours.component.html',
  styleUrls: ['./detail-cours.component.css']
})
export class DetailCoursComponent implements OnInit {

  coursId!: number;

  // Initialisation d'un cours vide pour éviter erreurs *ngFor
  cours: any = {
    titre: '',
    matiere: '',
    enseignant: { nom: '' },
    statut: '',
    ressources: [],
    quiz: [],
    examens: []
  };

  // Données statiques pour test
  coursList = [
    {
      id: 1,
      titre: 'Math 101',
      matiere: 'Math',
      enseignant: { nom: 'M. Ali' },
      statut: 'en attente',
      ressources: [
        { id: 1, titre: 'PDF Chap 1', type: 'PDF', statut: 'en attente' },
        { id: 2, titre: 'Vidéo intro', type: 'Vidéo', statut: 'validé' }
      ],
      quiz: [
        { id: 1, titre: 'Quiz Chap 1', nombreQuestions: 10, statut: 'en attente' }
      ],
      examens: [
        { id: 1, titre: 'Examen midterm', date: '15/12', statut: 'en attente' }
      ]
    },
    {
      id: 2,
      titre: 'Physique',
      matiere: 'Phys',
      enseignant: { nom: 'Mme Leila' },
      statut: 'validé',
      ressources: [
        { id: 3, titre: 'PDF Physique', type: 'PDF', statut: 'validé' }
      ],
      quiz: [
        { id: 2, titre: 'Quiz Physique', nombreQuestions: 8, statut: 'validé' }
      ],
      examens: [
        { id: 2, titre: 'Examen final', date: '20/12', statut: 'en attente' }
      ]
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.coursId = Number(params.get('id'));
      console.log('Cours ID reçu:', this.coursId);
      this.getCoursDetails();
    });
  }

  getCoursDetails() {
    const found = this.coursList.find(c => c.id === this.coursId);
    if (found) {
      this.cours = { ...found };
    } else {
      console.error('Cours non trouvé pour ID', this.coursId);
      this.router.navigate(['/dashboard-admin/cours']);
    }
  }

  validerItem(item: any) {
    item.statut = 'validé';
  }

  rejeterItem(item: any) {
    item.statut = 'rejeté';
  }

  modifierItem(item: any) {
    alert('Modifier ' + item.titre);
  }

  supprimerItem(list: any[], item: any) {
    const index = list.indexOf(item);
    if (index > -1) list.splice(index, 1);
  }

  retourCours() {
    this.router.navigate(['/dashboard-admin/cours']);
  }

}
