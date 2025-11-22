import { QuizResponseDTO, QuizService } from './../../../services/QuizService/quiz.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  quizForm!: FormGroup;
  isSubmitting = false;
  courseId!: number;

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du cours depuis l'URL
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));

    this.quizForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      questions: this.fb.array([this.createQuestion()])
    });
  }

  // Getter pour le FormArray
  get questionsArray(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  // Créer une question
  createQuestion(): FormGroup {
    return this.fb.group({
      enonce: ['', Validators.required],
      reponseCorrecte: ['', Validators.required],
      options: this.fb.array([]) // si tu veux des options multiples
    });
  }

  // Ajouter une question
  addQuestion(): void {
    this.questionsArray.push(this.createQuestion());
  }

  // Supprimer une question
  removeQuestion(index: number): void {
    if (this.questionsArray.length > 1) {
      this.questionsArray.removeAt(index);
    }
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.quizForm.reset();
    this.questionsArray.clear();
    this.addQuestion();
  }

  // Retour vers la page détail du cours
  goBack(): void {
    this.router.navigate([`/dashboard-enseignant/detailCours/${this.courseId}`]);
  }

  // Soumission du formulaire
  onSubmit(): void {
  if (this.quizForm.invalid) {
    this.quizForm.markAllAsTouched();
    return;
  }

  this.isSubmitting = true;

  // Création du payload conforme
  const quizData: QuizResponseDTO = {
    titre: this.quizForm.value.titre,
    idCours: this.courseId,
    questions: this.quizForm.value.questions.map((q: any) => ({
      enonce: q.enonce,
      reponseCorrecte: q.reponseCorrecte
    }))
  };

  this.quizService.saveQuiz(quizData).subscribe({
    next: (res) => {
      console.log('Quiz créé avec succès', res);
      this.resetForm();
      this.isSubmitting = false;
    },
    error: (err) => {
      console.error('Erreur lors de la création du quiz', err);
      this.isSubmitting = false;
    }
  });
}
}
