import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CoursService, ParticipationCoursDto, CoursDTO } from '../../../services/coursService/cours.service';

interface StatCard {
  icon: string;
  title: string;
  value: string | number;
  unit: string;
  color: string;
}


@Component({
  selector: 'app-dashboard-etudiant',
  templateUrl: './dashboard-etudiant.component.html',
  styleUrls: ['./dashboard-etudiant.component.css']
})
export class DashboardEtudiantComponent {
  searchTerm: string = '';
  constructor(private router: Router, private authService: AuthService,private coursService: CoursService) {}
  courses: CoursDTO[] = [];

  userName: string = 'Utilisateur';
  searchQuery = '';
  isSidebarOpen = false;
  activeItem: string = 'Tableau de bord';

  statCards: StatCard[] = [
    { icon: "📚", title: "Cours inscrits", value: 0, unit: "cours", color: "#2d9cdb" },
    { icon: "📊", title: "Progression moyenne", value: 65, unit: "%", color: "#f2c94c" },
    { icon: "⏱️", title: "Temps d'apprentissage", value: 42, unit: "h", color: "#1a3b5f" },
  ];

  menuItems = [
    { name: 'Tableau de bord', icon: 'fa-solid fa-home', color: '#1a3b5f', route: '/dashboard' },
    { name: 'Cours', icon: 'fa-solid fa-book', color: '#1a3b5f', route: '/cours' },
    { name: 'Profil', icon: 'fa-solid fa-user', color: '#1a3b5f', route: '/profile' },
  ];

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  setActiveItem(itemName: string, route: string): void {
    this.activeItem = itemName;

    if (route && route !== '#') {
      this.router.navigate([route]);
    }
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    const user = this.authService.getUserInfo();
    if (user) {
      this.userName = user.sub.split('@')[0];
    }
  // Charger les cours
  this.loadMyCourses();
  }
  filteredMyCourses() {
    return this.courses.filter(c =>
      c.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  numberOfCourses: number = 0; // stocke le nombre de cours

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
        this.numberOfCourses = this.courses.length; // Met à jour le nombre de cours
        // Mettre à jour la statCard "Cours inscrits"
const coursStat = this.statCards.find(s => s.title === "Cours inscrits");
if (coursStat) {
  coursStat.value = this.numberOfCourses;
}
      },
      error: (err) => console.error('Erreur chargement cours:', err)
    });
  }
  openCourse(course: CoursDTO) {
      // redirige vers /courses/<id du cours>
      this.router.navigate(['/courses', course.id]);
    }
}
