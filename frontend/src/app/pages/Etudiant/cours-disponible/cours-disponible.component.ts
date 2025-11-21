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
  courses: CoursDTO[] = [];

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

  filteredMyCourses() {
    return this.courses.filter(c =>
      c.titre.toLowerCase().includes(this.isearchTerm.toLowerCase())
    );
  }

  openCourse(course: CoursDTO) {
    this.coursService.inscrireAuCours(course.id).subscribe({
      next: res => alert(`Inscription réussie: ${res}`),  // message succès
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
