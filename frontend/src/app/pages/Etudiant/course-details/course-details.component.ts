import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursService, CoursDTO } from '../../../services/coursService/cours.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  courseId!: number;
  course?: CoursDTO;
isearchTerm = '';
  isSidebarOpen = false;
  activeItem = 'Cours';

  menuItems = [
    { name: 'Tableau de bord', icon: 'fa-solid fa-home', color: '#1a3b5f', route: '/dashboard-etudiant' },
    { name: 'Cours', icon: 'fa-solid fa-book', color: '#1a3b5f', route: '/cours' },
    { name: 'Profil', icon: 'fa-solid fa-user', color: '#1a3b5f', route: '/profile' },
  ];

  constructor(private route: ActivatedRoute, private router: Router, private coursService: CoursService) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCourse();
  }

  loadCourse() {
    this.coursService.getCoursById(this.courseId).subscribe({
      next: (data) => this.course = data,
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
}
