import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursDTO, CoursService } from 'src/app/services/coursService/cours.service';

@Component({
  selector: 'app-detail-cours',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class DetailCoursComponent implements OnInit {
  courseId!: number;
  course?: CoursDTO;
  loading: boolean = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private coursService: CoursService) {}

  ngOnInit(): void {
    // Récupérer l’ID du cours depuis la route
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      console.error('ID de cours manquant dans l’URL');
      this.router.navigate(['/dashboard-enseignant/mes-cours']);
      return;
    }

    this.courseId = +idParam;
    this.loadCourse();
  }

  loadCourse(): void {
    // Charger tous les cours de l'enseignant puis trouver celui correspondant à l'ID
    this.coursService.getMyCours().subscribe({
      next: (courses) => {
        this.course = courses.find(c => c.id === this.courseId);
        if (!this.course) {
          console.error(`Cours non trouvé pour l’ID: ${this.courseId}`);
          this.router.navigate(['/dashboard-enseignant/mes-cours']);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des cours:', err);
        this.loading = false;
      }
    });
  }

  // Boutons d’action
  seeQuiz(): void {
    if (!this.course) return;
    this.router.navigate([`/dashboard-enseignant/quiz-list`, this.course.id]);
  }

  seeExam(): void {
    if (!this.course) return;
    this.router.navigate([`/dashboard-enseignant/courseExam`, this.course.id]);
  }

  addResource(): void {
    if (!this.course) return;
    this.router.navigate([`/dashboard-enseignant/add-ressource`, this.course.id]);
  }

  goBack(): void {
    this.router.navigate(['/dashboard-enseignant/mes-cours']);
  }
}
