import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Examen {
  id: number;
  titre: string;
  url: string;
  corrige: boolean;
  coursId: number;
}

interface Participation {
  id: number;
  studentName: string;
  note?: number;
  urlSoumission: string;
  corrige: boolean;
}

@Component({
  selector: 'app-course-exams',
  templateUrl: './course-exams.component.html',
  styleUrls: ['./course-exams.component.css']
})
export class CourseExamsComponent implements OnInit {

  courseId!: number;
  courseTitle: string = '';

  examens: Examen[] = [];
  participations: Participation[] = [];
  selectedExamenId: number | null = null;

  newExamTitre: string = '';
  selectedFile: File | null = null;   // ✅ Correction : initialise à null pour éviter l’erreur

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.courseTitle = "Exemple de cours " + this.courseId;

    this.examens = [
      { id: 1, titre: "Examen 1", url: "assets/exams/exam1.pdf", corrige: false, coursId: this.courseId },
      { id: 2, titre: "Examen 2", url: "assets/exams/exam2.pdf", corrige: true, coursId: this.courseId },
    ];

    this.participations = [
      { id: 1, studentName: "Alice", note: 15, urlSoumission: "assets/submissions/alice_exam1.pdf", corrige: true },
      { id: 2, studentName: "Bob", note: undefined, urlSoumission: "assets/submissions/bob_exam1.pdf", corrige: false },
    ];
  }

  selectExamen(examenId: number) {
    this.selectedExamenId = examenId;
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      url: URL.createObjectURL(this.selectedFile!)

    }
  }

  addExamen() {
    if (this.newExamTitre && this.selectedFile) {
      const newExam: Examen = {
        id: this.examens.length + 1,
        titre: this.newExamTitre,
        url: URL.createObjectURL(this.selectedFile), 
        corrige: false,
        coursId: this.courseId
      };

      this.examens.push(newExam);

      // Reset
      this.newExamTitre = '';
      this.selectedFile = null;

      console.log('Examen ajouté:', newExam);
    }
  }

  gradeParticipation(participationId: number) {
    console.log("Noter la participation", participationId);
  }

  goBack() {
    this.router.navigate(['/dashboard-enseignant/mes-cours']);
  }
}
