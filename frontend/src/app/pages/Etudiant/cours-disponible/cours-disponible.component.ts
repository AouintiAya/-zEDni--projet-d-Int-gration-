import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursService, CoursDTO } from '../../../services/coursService/cours.service';

@Component({
  selector: 'app-page-cours-disponibles',
  templateUrl: './cours-disponible.component.html',
  styleUrls: ['./cours-disponible.component.css']
})
export class CoursDisponibleComponent implements OnInit {
  isearchTerm = '';
  isSidebarOpen = false;
  activeItem = 'Cours';

  courses: CoursDTO[] = [];

  menuItems = [
    { name: 'Tableau de bord', icon: 'fa-solid fa-home', color: '#1a3b5f', route: '/dashboard-etudiant' },
    { name: 'Cours', icon: 'fa-solid fa-book', color: '#1a3b5f', route: '/cours' },
    { name: 'Profil', icon: 'fa-solid fa-user', color: '#1a3b5f', route: '/profile' },
  ];

  constructor(private router: Router, private coursService: CoursService) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.coursService.getAllCours().subscribe({
      next: (data) => this.courses = data,
      error: (err) => console.error('Erreur chargement cours:', err)
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  setActiveItem(name: string, route: string) {
    this.activeItem = name;
    this.router.navigate([route]);
  }

  filteredMyCourses() {
    return this.courses.filter(c =>
      c.titre.toLowerCase().includes(this.isearchTerm.toLowerCase())
    );
    }
openCourse(course: CoursDTO) {
  this.coursService.inscrireAuCours(course.id).subscribe({
    next: res => alert(`Inscription réussie: ${res}`),  // Success message
    error: err => {
      console.error('Erreur inscription:', err);
      if (err.status === 403) {
        alert('Accès refusé. Vérifiez vos permissions ou reconnectez-vous.');
      } else {
        alert('Erreur lors de l\'inscription. Réessayez plus tard.');
      }
    }
  });
}

}
