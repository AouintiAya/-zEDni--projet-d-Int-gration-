import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CoursDTO, CoursService } from 'src/app/services/coursService/cours.service';

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
    { icon: '📘', title: 'Cours', value: 0, unit: '', color: '#3f51b5' },
    { icon: '👥', title: 'Étudiants', value: 0, unit: '', color: '#009688' },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private coursService: CoursService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserInfo();
    if (user) {
      this.userName = user.sub.split('@')[0];
    }
    this.loadCourses();
  }

  createCourse(): void {
    this.router.navigate(['/dashboard-enseignant/create-course']);
  }

  loadCourses(): void {
    this.coursService.getMyCours().subscribe({
      next: (res) => {
        // Ajouter le compteur d'étudiants pour chaque cours
        this.courses = res.map(course => ({
          ...course,
          etudiantsCount: (course as any).participations?.length || 0
        }));
        this.filteredCourses = this.courses;

        // Mettre à jour les statistiques
        this.updateStats();
      },
      error: (err) => console.error(err)
    });
  }

  updateStats(): void {
    this.statCards[0].value = this.courses.length; // Nombre de cours
    this.statCards[1].value = this.courses.reduce((acc, course) => acc + (course.etudiantsCount || 0), 0); // Total étudiants
    // L'index 2 (Avis) reste 0 ou tu peux le calculer si tu as des notes
  }

  getStatusColor(status: string | undefined): string {
    switch (status?.toLowerCase()) {
      case 'published': return '#4caf50';
      case 'draft': return '#ff9800';
      default: return '#9e9e9e';
    }
  }

  goToCourse(id: number): void {
    this.router.navigate(['/dashboard-enseignant/course', id]);
  }
}
