import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamenDTO, ExamenService, ParticipationExamenDTO } from 'src/app/services/ExamenService/examen.service';

@Component({
  selector: 'app-course-exams',
  templateUrl: './course-exams.component.html',
  styleUrls: ['./course-exams.component.css']
})
export class CourseExamsComponent implements OnInit {

  courseId!: number;
  courseTitle: string = '';
  examens: ExamenDTO[] = [];
  participations: ParticipationExamenDTO[] = [];
  selectedExamenId: number | null = null;

  newExamTitre: string = '';
  selectedFile: File | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private examenService: ExamenService) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.courseTitle = `Examen du cours ${this.courseId}`;
    this.loadExamens();
  }

  loadExamens() {
    this.examenService.getExamensByCours(this.courseId).subscribe({
      next: res => {
        console.log('Examens récupérés:', res);
        this.examens = res;
      },
      error: err => {
        console.error('Erreur récupération examens:', err);
      }
    });
  }

  selectExamen(examenId: number) {
    this.selectedExamenId = examenId;
    console.log('Examen sélectionné:', examenId);

    this.examenService.getParticipationsByExamen(examenId).subscribe({
      next: res => {
        console.log('Participations récupérées:', res);
        this.participations = res;
      },
      error: err => {
        console.error('Erreur récupération participations:', err);
      }
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log('Fichier sélectionné:', this.selectedFile);
    }
  }

  addExamen() {
    if (!this.newExamTitre || !this.selectedFile) return;

    const formData = new FormData();
    formData.append('titre', this.newExamTitre);
    formData.append('file', this.selectedFile);

    this.examenService.addExamen(formData).subscribe({
      next: res => {
        console.log('Examen ajouté avec succès:', res);
        this.examens.push(res);
        this.newExamTitre = '';
        this.selectedFile = null;
      },
      error: err => {
        console.error('Erreur ajout examen:', err);
      }
    });
  }

  gradeParticipation(participationId: number) {
    const note = prompt('Entrer la note:');
    if (!note) return;

    const request = { participationId, note: Number(note) };
    this.examenService.gradeParticipation(request).subscribe({
      next: res => {
        console.log('Participation notée:', res);
        this.selectExamen(this.selectedExamenId!); // recharger participations
      },
      error: err => {
        console.error('Erreur notation:', err);
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard-enseignant/mes-cours']);
  }
}
