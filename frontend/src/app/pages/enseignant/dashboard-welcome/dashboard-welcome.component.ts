import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CoursDTO, CoursService, DashboardDTO, ParticipationCoursDto } from 'src/app/services/coursService/cours.service';

interface StatCard {
  icon: string;
  title: string;
  value: string | number;
  unit: string;
  color: string;
}

@Component({
  selector: 'app-dashboard-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-welcome.component.html',
  styleUrls: ['./dashboard-welcome.component.css']
})
export class DashboardWelcomeComponent implements OnInit {

  userName: string = 'Professeur';
  courses: CoursDTO[] = [];
  filteredCourses: CoursDTO[] = [];
  statCards: StatCard[] = [
    { title: 'Mes cours', value: 1, unit: '', icon: '📚', color: '#4CAF50' },
    { title: 'Étudiants inscrits', value: 1, unit: '', icon: '👥', color: '#2196F3' },
  ];

  constructor(
    private router: Router,
    private coursService: CoursService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserInfo();
    if (user) {
      this.userName = user.sub.split('@')[0];
    }
    this.loadCourses();
    this.loadDashboard();
  }

  createCourse(): void {
    this.router.navigate(['/dashboard-enseignant/create-course']);
  }

  /** Charger les cours du professeur et calculer le nombre d'étudiants uniques */
  loadCourses(): void {
    this.coursService.getMyCours().subscribe({
      next: (courses: CoursDTO[]) => {
        this.courses = courses.map(c => ({ ...c, etudiantsCount: 0 }));
        this.filteredCourses = this.courses;

        // Récupérer toutes les participations
        this.coursService.getMyCourses().subscribe({
          next: (participations: ParticipationCoursDto[]) => {
            // Set pour compter les étudiants uniques
            const uniqueStudents = new Set<number>();

            participations.forEach(p => {
              if ((p as any).etudiant_id) uniqueStudents.add((p as any).etudiant_id);
            });

            // Remplir le nombre d'étudiants par cours
            this.courses.forEach(course => {
              const count = participations.filter(p => p.coursId === course.id).length;
              course.etudiantsCount = count;
            });

            // Mettre à jour la statistique
            this.statCards[1].value = uniqueStudents.size;
          },
          error: (err) => console.error('Erreur récupération participations:', err)
        });
      },
      error: (err) => console.error(err)
    });
  }

  loadDashboard(): void {
    this.coursService.getDashboard().subscribe((data: DashboardDTO) => {
      this.statCards[0].value = data.totalCourses;
      // Le total des étudiants uniques est calculé dans loadCourses
    });
  }

  goToCourse(id: number): void {
    this.router.navigate(['/dashboard-enseignant/course', id]);
  }

  getStatusColor(status: string | undefined): string {
    switch (status?.toLowerCase()) {
      case 'published': return '#4caf50';
      case 'draft': return '#ff9800';
      default: return '#9e9e9e';
    }
  }
}
