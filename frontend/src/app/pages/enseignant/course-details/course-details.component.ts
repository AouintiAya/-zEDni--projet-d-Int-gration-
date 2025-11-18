import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Définition de l’interface Course
interface Course {
  id: number;
  title: string;
  students: number;
  rating: number;
  status: string;
  image: string;
  description?: string;
  lastUpdated?: string;
}

@Component({
  selector: 'app-detail-cours',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class DetailCoursComponent implements OnInit {
  courseId!: number;
  course!: Course;

  // 🔹 Liste statique de cours (la même que dans CourseListComponent)
  courses: Course[] = [
    { id: 1, title: "Web Development Fundamentals", students: 45, rating: 4.8, status: "En cours", image: "assets/images/css.jpg", description: "Apprenez les bases du développement web", lastUpdated: "2024-01-15" },
    { id: 2, title: "Programmation Python", students: 32, rating: 4.9, status: "En cours", image: "assets/images/python.jpg", description: "Maîtrisez Python pour la programmation", lastUpdated: "2024-01-10" },
    { id: 3, title: "Cybersécurité", students: 28, rating: 4.7, status: "Complété", image: "assets/images/cyber.jpg", description: "Protégez vos systèmes et données", lastUpdated: "2024-01-05" },
    { id: 4, title: "Intelligence Artificielle", students: 36, rating: 4.6, status: "En cours", image: "assets/images/ai.jpg", description: "Explorez l'IA et le machine learning", lastUpdated: "2024-01-12" },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // 🔹 Récupérer l’ID du cours depuis la route
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.course = this.courses.find(c => c.id === this.courseId)!;

    if (!this.course) {
      console.error('Cours non trouvé pour l’ID:', this.courseId);
      // Optionnel : revenir à la liste des cours si l’ID est invalide
      this.router.navigate(['/dashboard-enseignant/mes-cours']);
    }
  }

  // 🔹 Boutons d’action
  seeQuiz() {
  console.log(`Voir quiz pour le cours ${this.courseId}`);
  this.router.navigate([`/dashboard-enseignant/quiz-list`, this.courseId]);
}

  SeeExam() {
      this.router.navigate(['/dashboard-enseignant/courseExam', this.courseId]);
    // ici tu peux rediriger vers une page création examen
  }

  // 🔹 Retour à la liste des cours
  goBack() {
    this.router.navigate(['/dashboard-enseignant/mes-cours']);
  }
}
