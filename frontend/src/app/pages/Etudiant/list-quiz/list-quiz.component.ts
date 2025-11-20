import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Question {
  texte: string;
  reponseCorrecte: string;
}

interface Quiz {
  id: number;
  courseId: number;
  titre: string;
  questions: Question[];
}
export interface RessourceDTO {
  id: number;
  titre: string;
  type: string;
  url: string;
  coursId: number;
}
@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.css']
})
export class ListQuizComponent implements OnInit {
 
   quizzes: Quiz[] = [];             // Quizzes filtrés pour le cours
   selectedQuiz: Quiz | null = null;
   editMode: boolean = false;
   courseId!: number;
 
   constructor(private router: Router, private route: ActivatedRoute) {}
 
   ngOnInit(): void {
     // Récupérer l'ID du cours depuis la route
     this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
 
     // Quizzes statiques avec courseId
     const allQuizzes: Quiz[] = [
       {
         id: 1,
         courseId: 1,
         titre: 'Quiz Mathématiques',
         questions: [
           { texte: '2 + 2 = ?', reponseCorrecte: '4' },
           { texte: '3 * 3 = ?', reponseCorrecte: '9' }
         ]
       },
       {
         id: 2,
         courseId: 2,
         titre: 'Quiz Physique',
         questions: [
           { texte: 'Force = masse * ?', reponseCorrecte: 'accélération' },
           { texte: 'Vitesse de la lumière ?', reponseCorrecte: '3e8 m/s' }
         ]
       },
       {
         id: 3,
         courseId: 1,
         titre: 'Quiz Algèbre',
         questions: [
           { texte: 'x + 3 = 7 ?', reponseCorrecte: '4' }
         ]
       }
     ];
 
     // Filtrer uniquement les quizzes du cours
     this.quizzes = allQuizzes.filter(q => q.courseId === this.courseId);
   }
 
   viewParticipations(quiz: Quiz) {
     this.router.navigate([`/dashboard-enseignant/quiz-list/participations/${quiz.id}`]);
   }
 
   modifyQuiz(quiz: Quiz) {
     this.selectedQuiz = {
       id: quiz.id,
       courseId: quiz.courseId,
       titre: quiz.titre,
       questions: quiz.questions.map(q => ({ ...q }))
     };
     this.editMode = true;
   }
 
   saveQuiz() {
     if (!this.selectedQuiz) return;
     const index = this.quizzes.findIndex(q => q.id === this.selectedQuiz!.id);
     if (index !== -1) this.quizzes[index] = { ...this.selectedQuiz };
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
     if (this.selectedQuiz) this.selectedQuiz.questions.push({ texte: '', reponseCorrecte: '' });
   }
 
   removeQuestion(i: number) {
     if (this.selectedQuiz) this.selectedQuiz.questions.splice(i, 1);
   }
 
   goBackToCourses() {
     // Redirige vers la page de détail du cours actuel
     this.router.navigate([`/courses/${this.courseId}`]);
   }
 
   
 }
 