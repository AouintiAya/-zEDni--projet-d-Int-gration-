import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursService, ParticipationCoursDto, CoursDTO } from '../../../services/coursService/cours.service';

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
    this.loadMyCourses();
  }

 loadMyCourses() {
  this.coursService.getMyCourses().subscribe({
    next: (data: ParticipationCoursDto[]) => {
      // Convertir les participations en CoursDTO pour l'affichage
      this.courses = data.map(p => ({
        id: p.coursId,          // <-- utiliser l'id réel du cours
        titre: p.titreCours,
        description: '',        // à compléter côté backend si tu veux la description complète
        enseignantEmail: '',    // ou récupérer depuis backend si disponible
        dateInscription: p.dateInscription,
        ressources: [],
        imageUrl: ''            // ou récupérer depuis backend si disponible
      }));
    },
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
    // redirige vers /courses/<id du cours>
    this.router.navigate(['/courses', course.id]);
  }
}
