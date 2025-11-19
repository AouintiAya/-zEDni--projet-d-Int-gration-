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
  courseId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get courseId from route
    this.courseId = +this.route.snapshot.paramMap.get('id')!;
    
    this.quizForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]]
    });

    // Initialize with at least one question
    this.addQuestion();
  }

  goBack(): void {
  if (this.courseId) {
    this.router.navigate(['/dashboard-enseignant/detailCours', this.courseId]);
  } else {
    // fallback au cas où aucun ID n’est fourni
    this.router.navigate(['/dashboard-enseignant/mes-cours']);
  }
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

    // Validate all questions have content
    const validQuestions = this.questions.every(q => q.texte && q.reponseCorrecte);
    if (!validQuestions) {
      alert('Veuillez remplir toutes les questions et réponses');
      return;
    }

    this.isSubmitting = true;

    const quiz = {
      id: new Date().getTime(),
      titre: this.quizForm.value.titre,
      questions: this.questions,
      participations: []
    };

    console.log('Quiz créé:', quiz);
    
    // Simulate API call
    setTimeout(() => {
      alert('Quiz créé avec succès!');
      this.resetForm();
      this.isSubmitting = false;
      this.router.navigate(['/dashboard-enseignant/detail-cours', this.courseId]);
    }, 1000);
  }
}
