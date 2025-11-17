import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Définition des types
interface Participation {
  studentId: string;
  reponses: string;
  note: number;
  corrige: string;
}

interface Quiz {
  id: number;
  titre: string;
  questions: { texte: string; reponseCorrecte: string }[];
}

@Component({
  selector: 'app-participation-list',
  templateUrl: './participation-list.component.html',
  styleUrls: ['./participation-list.component.css']
})
export class ParticipationListComponent implements OnInit {

  quiz: Quiz | null = null;
  participations: Participation[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupérer l'ID du quiz depuis l'URL
    const quizId = this.route.snapshot.paramMap.get('quizId');

    // Données statiques des quizzes et participations
    const allQuizzes: Quiz[] = [
      {
        id: 1,
        titre: 'Quiz Mathématiques',
        questions: [
          { texte: '2 + 2 = ?', reponseCorrecte: '4' },
          { texte: '3 * 3 = ?', reponseCorrecte: '9' }
        ]
      },
      {
        id: 2,
        titre: 'Quiz Physique',
        questions: [
          { texte: 'Force = masse * ?', reponseCorrecte: 'accélération' },
          { texte: 'Vitesse de la lumière ?', reponseCorrecte: '3e8 m/s' }
        ]
      }
    ];

    // Sélectionner le quiz correspondant
    this.quiz = allQuizzes.find(q => q.id.toString() === quizId!) || null;

    // Données statiques des participations selon l'ID du quiz
    if (quizId === '1') {
      this.participations = [
        { studentId: 'Étudiant1', reponses: '2, 4, 6', note: 8, corrige: '2, 4, 6' },
        { studentId: 'Étudiant2', reponses: '2, 3, 6', note: 6, corrige: '2, 4, 6' },
        { studentId: 'Étudiant3', reponses: '2, 4, 6', note: 10, corrige: '2, 4, 6' }
      ];
    } else if (quizId === '2') {
      this.participations = [
        { studentId: 'Étudiant4', reponses: 'F, 3e8', note: 9, corrige: 'F, 3e8' },
        { studentId: 'Étudiant5', reponses: 'F, 2e8', note: 7, corrige: 'F, 3e8' }
      ];
    }
  }
}
