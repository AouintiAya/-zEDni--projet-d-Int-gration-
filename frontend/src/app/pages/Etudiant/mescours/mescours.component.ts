import { Component } from '@angular/core';
import { Router } from '@angular/router';
// Définition de l'interface Course
interface Course {
  name: string;
  description: string;
  image: string;
  rating: number;
}

@Component({
  selector: 'app-my-courses',
  templateUrl: './mescours.component.html',
  styleUrls: ['./mescours.component.css']
})

export class MesCoursComponent {
  searchTerm: string = '';
  isSidebarOpen: boolean = false;
  activeItem: string = 'Mes Cours';

  menuItems = [
    { name: 'Tableau de bord', icon: 'fa-solid fa-home', color: '#1a3b5f', route: '/dashboard-etudiant' },
    { name: 'Cours', icon: 'fa-solid fa-book', color: '#1a3b5f', route: '/cours' },
    { name: 'Profil', icon: 'fa-solid fa-user', color: '#1a3b5f', route: '/profile' },
  ];

   myCourses: Course[] = [
    {
      name: 'Cybersécurité',
      description: 'Apprenez à protéger les systèmes et réseaux contre les menaces numériques modernes.',
      image: 'assets/images/cyber.jpg',
      rating: 5
    },
    {
      name: 'Intelligence Artificielle',
      description: 'Découvrez les bases et applications de l’IA dans le monde moderne.',
      image: 'assets/images/ai.jpg',
      rating: 4
    },
    {
      name: 'Développement Web',
      description: 'Apprenez HTML, CSS, JavaScript et frameworks modernes.',
      image: 'assets/images/python.jpg',
      rating: 4
    }
  ];

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  setActiveItem(name: string, route: string) {
    this.activeItem = name;
    this.router.navigate([route]);
  }

  filteredMyCourses() {
    return this.myCourses.filter(course =>
      course.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openCourse(course: Course) {
    // ici tu peux rediriger vers la page de détails du cours
    console.log('Ouverture du cours:', course.name);
  }
}
