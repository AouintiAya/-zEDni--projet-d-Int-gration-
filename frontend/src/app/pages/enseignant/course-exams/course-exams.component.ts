import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import {
  ExamenDTO,
  ExamenService,
  ParticipationExamenDTO
} from 'src/app/services/ExamenService/examen.service';
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

  examens: ExamenDTO[] = [];
  participations: ParticipationExamenDTO[] = [];
  selectedExamenId: number | null = null;

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

    // Charger cours et examens en parallèle
    forkJoin({
      course: this.courseService.getCoursById(this.courseId),
      examens: this.examenService.getExamensByCours(this.courseId)
    }).subscribe({
      next: ({ course, examens }) => {
        this.course = course;
        this.courseTitle = course.titre;
        this.examens = examens;
        this.loading = false;
      },
      error: err => {
        console.error('Erreur lors du chargement:', err);
        this.loading = false;
      }
    });
  }

  selectExamen(examenId: number): void {
    this.selectedExamenId = examenId;
    this.examenService.getParticipationsByExamen(examenId).subscribe({
      next: res => this.participations = res,
      error: err => console.error(err)
    });
  }

  addExamen(): void {
    if (!this.newExamTitre || !this.newExamUrl) {
      console.error('Titre ou URL manquant.');
      return;
    }

    const examen: ExamenDTO = {
      titre: this.newExamTitre,
      url: this.newExamUrl,
      idCours: this.courseId
    };

    this.examenService.saveExamen(examen).subscribe({
      next: res => {
        this.examens.push(res);
        this.newExamTitre = '';
        this.newExamUrl = '';
      },
      error: err => console.error(err)
    });
  }

  gradeParticipation(participationId: number): void {
    const noteInput = prompt('Entrer la note :');
    if (!noteInput?.trim()) return;

    const request = {
      participationId,
      note: Number(noteInput)
    };

    this.examenService.gradeParticipation(request).subscribe({
      next: () => {
        if (this.selectedExamenId) {
          this.selectExamen(this.selectedExamenId);
        }
      },
      error: err => console.error(err)
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard-enseignant/mes-cours']);
  }
}
