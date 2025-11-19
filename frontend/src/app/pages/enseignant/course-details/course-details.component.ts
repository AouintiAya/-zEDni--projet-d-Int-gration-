import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CoursDTO,
  CoursService,
  RessourceDTO,
} from 'src/app/services/coursService/cours.service';



@Component({
  selector: 'app-detail-cours',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class DetailCoursComponent implements OnInit {
  courseId!: number;
  course?: CoursDTO;
  loading: boolean = true;
  ressources: RessourceDTO[] = [];

  @ViewChild('resourcesSection', { static: false }) resourcesSection!: ElementRef;
  


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
    this.loadRessources();
  }

  /* ==========================
     CHARGEMENT DU COURS
     ========================== */
  loadCourse(): void {
    this.coursService.getCoursById(this.courseId).subscribe({
      next: (res) => {
        this.course = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du cours :', err);
        this.loading = false;
      },
    });
  }

  /* ==========================
     CHARGEMENT DES RESSOURCES
     ========================== */
  loadRessources(): void {
    this.coursService.getRessourcesByCours(this.courseId).subscribe({
      next: (res) => {
        this.ressources = res;
        console.log('Ressources chargées :', this.ressources);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des ressources :', err);
      },
    });
  }

  /* ==========================
     BOUTONS D’ACTION
     ========================== */

  addQuiz(): void {
  if (!this.course) return;
  this.router.navigate([`/dashboard-enseignant/create-quiz`, this.course.id]); 
  // -> Angular prend le dernier segment comme paramètre idCours automatiquement
}


  seeQuiz(): void {
    if (!this.course) return;
    this.router.navigate([`/dashboard-enseignant/quiz-list`, this.course.id]);
  }

  addExam(): void {
    if (!this.course) return;
    this.router.navigate([`/dashboard-enseignant/courseExam`, this.course.id]);
  }
  openExams(courseId: number) {
    this.router.navigate(['/dashboard-enseignant/cours', courseId, 'examens']);
  }

  addResource(): void {
    if (!this.course) return;
    this.router.navigate([
      `/dashboard-enseignant/add-ressource`,
      this.course.id,
    ]);
  }

  seeResource(courseId: number): void {
    if (!this.course) return;
    this.router.navigate([`/dashboard-enseignant/cours`, this.courseId,'ressources']);
  }

  /* ==========================
    RETOUR
  ========================== */
  goBack(): void {
    this.router.navigate(['/dashboard-enseignant/mes-cours']);
  }
}
