import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursDTO, CoursService, RessourceDTO } from 'src/app/services/coursService/cours.service';

@Component({
  selector: 'app-detail-cours',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class DetailCoursComponent implements OnInit {
  courseId!: number;
  course?: CoursDTO;
  loading: boolean = true;
  ressources: RessourceDTO[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursService: CoursService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      console.error('ID de cours manquant dans l’URL');
      this.router.navigate(['/dashboard-enseignant/mes-cours']);
      return;
    }

    this.courseId = +idParam;
    this.loadCourse();
    this.loadRessources(); // <-- appeler ici
  }

  loadCourse(): void {
    this.coursService.getCoursById(this.courseId).subscribe({
      next: (res) => {
        this.course = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du cours:', err);
        this.loading = false;
      }
    });
  }

  loadRessources(): void {
    this.coursService.getRessourcesByCours(this.courseId).subscribe({
      next: (res) => {
        this.ressources = res; // <-- stocker ici
        console.log('Ressources chargées:', this.ressources);
      },
      error: (err) => console.error('Erreur lors du chargement des ressources:', err)
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


  addQuiz(): void {
  if (!this.course) return;
  // Navigue vers la page de création d’un quiz pour ce cours
  this.router.navigate([`/dashboard-enseignant/create-quiz`, this.course.id]);
}


  goBack(): void {
    this.router.navigate(['/dashboard-enseignant/mes-cours']);
  }
}
