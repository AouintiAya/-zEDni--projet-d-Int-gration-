import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamenDTO, ExamenService } from 'src/app/services/ExamenService/examen.service';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {

  examens: ExamenDTO[] = [];
  courseId!: number;
  loading = true;
  error = '';

  constructor(private examenService: ExamenService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.courseId) {
      this.error = "ID du cours introuvable";
      this.loading = false;
      return;
    }

    this.loadExamens();
  }

  loadExamens() {
    this.examenService.getExamensByCours(this.courseId).subscribe({
      next: (data) => {
        this.examens = data;
        this.loading = false;
      },
      error: () => {
        this.error = "Erreur lors du chargement des examens";
        this.loading = false;
      }
    });
  }
}
