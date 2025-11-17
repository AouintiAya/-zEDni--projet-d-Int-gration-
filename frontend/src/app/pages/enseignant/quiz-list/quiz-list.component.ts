import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // déjà importé

// Définition des types
interface Question {
  texte: string;
  reponseCorrecte: string;
}

interface Quiz {
  id: number;
  titre: string;
  questions: Question[];
}

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {

  quizzes: Quiz[] = [];             // Liste de tous les quizzes
  selectedQuiz: Quiz | null = null; // Quiz sélectionné pour modification
  editMode: boolean = false;        // Formulaire d'édition ouvert

  // 🔹 Injection du Router ici
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Données statiques
    this.quizzes = [
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
  }

  viewParticipations(quiz: Quiz) {
    // Naviguer vers la page participations avec l'id du quiz
    this.router.navigate(['/participations', quiz.id]);
  }

  modifyQuiz(quiz: Quiz) {
    this.selectedQuiz = {
      id: quiz.id,
      titre: quiz.titre,
      questions: quiz.questions.map((q: Question) => ({ ...q }))
    };
    this.editMode = true;
  }

  saveQuiz() {
    if (!this.selectedQuiz) return;

    const index = this.quizzes.findIndex(q => q.id === this.selectedQuiz!.id);
    if (index !== -1) {
      this.quizzes[index] = { ...this.selectedQuiz };
    }
    this.cancelEdit();
  }

  cancelEdit() {
    this.selectedQuiz = null;
    this.editMode = false;
  }

  deleteQuiz(quiz: Quiz) {
    this.quizzes = this.quizzes.filter(q => q.id !== quiz.id);
  }

  addQuestion() {
    if (this.selectedQuiz) {
      this.selectedQuiz.questions.push({ texte: '', reponseCorrecte: '' });
    }
  }

  removeQuestion(i: number) {
    if (this.selectedQuiz) {
      this.selectedQuiz.questions.splice(i, 1);
    }
  }
}
