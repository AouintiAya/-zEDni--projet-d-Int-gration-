import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamenService, ExamenDTO } from 'src/app/services/ExamenService/examen.service';
import { CoursService, CoursDTO } from 'src/app/services/coursService/cours.service';

@Component({
  selector: 'app-course-exams',
  templateUrl: './course-exams.component.html',
  styleUrls: ['./course-exams.component.css']
})
export class CourseExamsComponent implements OnInit {

  courseId!: number;
  courseTitle: string = '';
  course!: CoursDTO;
  loading = true;

  newExamTitre: string = '';
  newExamUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examenService: ExamenService,
    private courseService: CoursService
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));

    this.courseService.getCoursById(this.courseId).subscribe({
      next: course => {
        this.course = course;
        this.courseTitle = course.titre;
        this.loading = false;
      },
      error: err => {
        console.error('Erreur lors du chargement du cours:', err);
        this.loading = false;
      }
    });
  }

  addExamen(): void {
    if (!this.newExamTitre || !this.newExamUrl) return;

    const examen: ExamenDTO = {
      titre: this.newExamTitre,
      url: this.newExamUrl,
      idCours: this.courseId
    };

    this.examenService.saveExamen(examen).subscribe({
      next: () => {
        alert('Examen ajouté avec succès !');
        this.newExamTitre = '';
        this.newExamUrl = '';
      },
      error: err => console.error('Erreur ajout examen', err)
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard-enseignant/mes-cours']);
  }
}
