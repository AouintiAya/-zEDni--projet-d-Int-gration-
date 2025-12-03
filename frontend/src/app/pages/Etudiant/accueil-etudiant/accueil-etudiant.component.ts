import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CoursService, ParticipationCoursDto, CoursDTO } from '../../../services/coursService/cours.service';
import { Router } from '@angular/router';

interface StatCard {
  icon: string;
  title: string;
  value: string | number;
  unit: string;
  color: string;
}

@Component({
  selector: 'app-accueil-etudiant',
  templateUrl: './accueil-etudiant.component.html',
  styleUrls: ['./accueil-etudiant.component.css']
})
export class AccueilEtudiantComponent implements OnInit {
  userName: string = 'Utilisateur';
  courses: CoursDTO[] = [];
  searchTerm: string = '';
  numberOfCourses: number = 0;

  statCards: StatCard[] = [
    { icon: '📚', title: 'Cours inscrits', value: 0, unit: 'cours', color: '#2d9cdb' },
    { icon: '📊', title: 'Nombre de quiz', value: 65, unit: 'quiz', color: '#f2c94c' },
   
  ];

  constructor(private authService: AuthService, private coursService: CoursService, private router: Router) {}

  ngOnInit(): void {
    const user = this.authService.getUserInfo();
    if (user) this.userName = user.sub.split('@')[0];

    this.loadMyCourses();
  }

  filteredMyCourses() {
    return this.courses.filter(c =>
      c.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
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
        this.numberOfCourses = this.courses.length;
        const coursStat = this.statCards.find(s => s.title === 'Cours inscrits');
        if (coursStat) coursStat.value = this.numberOfCourses;
      },
      error: (err) => console.error(err),
    });
  }

  openCourse(course: CoursDTO) {
  // navigue vers la page détail du cours
  this.router.navigate(['/dashboard-etudiant/courses', course.id]);
}

}
