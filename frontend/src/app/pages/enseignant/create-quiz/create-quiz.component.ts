import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {

  quizForm!: FormGroup;
  questions: any[] = [];
  isSubmitting: boolean = false;
  courseId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
  const idParam = this.route.snapshot.paramMap.get('idCours'); // <-- ici
  if (!idParam) {
    console.error('ID du cours manquant dans la route');
    this.router.navigate(['/dashboard-enseignant/mes-cours']);
    return;
  }
  this.courseId = +idParam;

  this.quizForm = this.fb.group({
    titre: ['', [Validators.required, Validators.minLength(3)]]
  });

  this.addQuestion();
}


  goBack(): void {
    // Retour vers la page de détail du cours
    this.router.navigate([`/dashboard-enseignant/detailCours/${this.courseId}`]);
  }

  addQuestion(): void {
    this.questions.push({ texte: '', reponseCorrecte: '' });
  }

  removeQuestion(index: number): void {
    if (this.questions.length > 1) {
      this.questions.splice(index, 1);
    }
  }

  resetForm(): void {
    this.quizForm.reset();
    this.questions = [];
    this.addQuestion();
  }

  onSubmit(): void {
    if (this.quizForm.invalid || this.questions.length === 0) {
      this.quizForm.markAllAsTouched();
      return;
    }

    const validQuestions = this.questions.every(q => q.texte && q.reponseCorrecte);
    if (!validQuestions) {
      alert('Veuillez remplir toutes les questions et réponses');
      return;
    }

    this.isSubmitting = true;

    const quiz = {
      id: new Date().getTime(),
      courseId: this.courseId, // garder le lien avec le cours
      titre: this.quizForm.value.titre,
      questions: this.questions
    };

    console.log('Quiz créé:', quiz);

    // Simuler appel API
    setTimeout(() => {
      alert('Quiz créé avec succès !');
      this.resetForm();
      this.isSubmitting = false;
      // Redirection vers le détail du cours
      this.router.navigate([`/dashboard-enseignant/detailCours/${this.courseId}`]);
    }, 1000);
  }
}
