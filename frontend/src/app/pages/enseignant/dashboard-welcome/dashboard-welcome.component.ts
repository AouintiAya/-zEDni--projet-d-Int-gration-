import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CoursDTO, CoursService,DashboardDTO } from 'src/app/services/coursService/cours.service';

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
  statCards: any[] = [];

  loadDashboard() {
    this.dashboardService.getDashboard().subscribe((data: DashboardDTO) => {
      this.statCards = [
        { title: 'Mes cours', value: data.totalCourses, unit: '', icon: '📚', color: '#4CAF50' },
        { title: 'Étudiants inscrits', value: data.totalStudents, unit: '', icon: '👥', color: '#2196F3' },
      ];
    });
  }
  constructor(
    private router: Router,
    private coursService: CoursService,
    private dashboardService: CoursService,
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

  loadCourses(): void {
    this.coursService.getMyCours().subscribe({
      next: (res) => {
        this.courses = res.map(course => ({
          ...course,
          etudiantsCount: (course as any).participations?.length || 0
        }));
        this.filteredCourses = this.courses;
        this.updateStats();
      },
      error: (err) => console.error(err)
    });
  }

  updateStats(): void {
    this.statCards[0].value = this.courses.length;
    this.statCards[1].value = this.courses.reduce((acc, course) => acc + (course.etudiantsCount || 0), 0);
  }

  getStatusColor(status: string | undefined): string {
    switch (status?.toLowerCase()) {
      case 'published': return '#4caf50';
      case 'draft': return '#ff9800';
      default: return '#9e9e9e';
    }
  }

  goToCourse(id: number): void {
  this.router.navigate([`/dashboard-enseignant/detailCours/${id}`]);
}

}
