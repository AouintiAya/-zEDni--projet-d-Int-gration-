// duplicate import removed; CoursService is imported together with CoursDTO below
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursService, CoursDTO } from '../../../services/coursService/cours.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './mescours.component.html',
  styleUrls: ['./mescours.component.css']
})
export class MesCoursComponent implements OnInit {

  searchTerm = '';
  isSidebarOpen = false;
  activeItem = 'Mes Cours';

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
      c.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openCourse(course: CoursDTO) {
    this.router.navigate(['/cours', course.id]);
  }
}
