import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursDTO, CoursService } from '../../../services/coursService/cours.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  courseId!: number;
  course?: CoursDTO;
  loading: boolean = true;
  previousUrl: string = '/dashboard-etudiant/mescours'; // <-- Déclaration obligatoire

  constructor(private route: ActivatedRoute, private router: Router, private coursService: CoursService) {
    // Récupérer la route précédente si possible
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.previousNavigation) {
      this.previousUrl = navigation.previousNavigation.finalUrl?.toString() || this.previousUrl;
    }
  }


  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCourse();
  }

  loadCourse() {
    this.loading = true;
    this.coursService.getCoursById(this.courseId).subscribe({
      next: (data) => {
        this.course = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement cours:', err);
        this.loading = false;
      }
    });
  }

  seeQuiz(courseId: number) {
    this.router.navigate(['/dashboard-etudiant/cours', courseId, 'ListQuizEtudiant']);
  }

  openExams(courseId: number) {
    this.router.navigate(['/dashboard-etudiant/cours', courseId, 'ExamenListEtudiant']);
  }

  seeResource(courseId: number) {
    this.router.navigate(['/dashboard-etudiant/cours', courseId, 'ressourcesEtudiant']);
  }

  goBack() {
    this.router.navigateByUrl(this.previousUrl);

  }
}
