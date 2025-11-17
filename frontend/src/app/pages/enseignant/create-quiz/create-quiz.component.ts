// src/app/create-quiz/create-quiz.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent {

  titre: string = '';
  questions: any[] = [];

  addQuestion() {
    this.questions.push({ texte: '', reponseCorrecte: '' });
  }

  submitQuiz() {
    const quiz = {
      id: new Date().getTime(), // id temporaire
      titre: this.titre,
      questions: this.questions,
      participations: []
    };
    console.log('Quiz créé:', quiz);
  }

}
