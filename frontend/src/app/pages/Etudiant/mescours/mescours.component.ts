import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursService, ParticipationCoursDto, CoursDTO } from '../../../services/coursService/cours.service';

@Component({
  selector: 'app-mes-cours',
  templateUrl: './mescours.component.html',
  styleUrls: ['./mescours.component.css']
})
export class MesCoursComponent implements OnInit {

  searchTerm = '';
  courses: CoursDTO[] = [];

  constructor(private router: Router, private coursService: CoursService) {}

  ngOnInit() {
    this.loadMyCourses();
  }

  loadMyCourses() {
    this.coursService.getMyCourses().subscribe({
      next: (data: ParticipationCoursDto[]) => {
        this.courses = data.map(p => ({
          id: p.coursId,
          titre: p.titreCours,
          description: '',
          enseignantEmail: '',
          dateInscription: p.dateInscription,
          ressources: [],
          imageUrl: ''
        }));
      },
      error: (err) => console.error('Erreur chargement cours:', err)
    });
  }

  filteredMyCourses() {
    return this.courses.filter(c =>
      c.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openCourse(course: CoursDTO) {
    this.router.navigate(['/dashboard-etudiant/courses', course.id]);
  }
}
