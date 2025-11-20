import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamenDTO, ExamenService } from 'src/app/services/ExamenService/examen.service';


@Component({
  selector: 'app-examen-list',
  templateUrl: './examen-list.component.html',
  styleUrls: ['./examen-list.component.css']
})
export class ExamenListComponent implements OnInit {

  examens: ExamenDTO[] = [];
  courseId!: number;
  loading = true;
  error = '';

  constructor(
    private examenService: ExamenService,
    private route: ActivatedRoute,
    private router: Router
    
    ) {}

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

  goBack(): void {
    // Retour vers la page de détail du cours
    this.router.navigate([`/dashboard-etudiant/courses/${this.courseId}`]);

  }
}

