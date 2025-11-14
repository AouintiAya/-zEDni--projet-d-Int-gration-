import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Course {
  name: string;
  description: string;
  image: string;
  rating: number;
}

@Component({
  selector: 'app-page-cours-disponibles',
  templateUrl: './cours-disponible.component.html',
  styleUrls: ['./cours-disponible.component.css']
})
export class CoursDisponibleComponent implements OnInit {
  isSidebarOpen = false;
  activeItem = 'Cours';
  searchTerm: string = '';

  menuItems = [
    { name: 'Tableau de bord', icon: 'fa-solid fa-home', color: '#1a3b5f', route: '/dashboard-etudiant' },
    { name: 'Cours', icon: 'fa-solid fa-book', color: '#1a3b5f', route: '/cours' },
    { name: 'Profil', icon: 'fa-solid fa-user', color: '#1a3b5f', route: '/profile' },
  ];

  courses: Course[] = [
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
    // Ajouter plus de cours ici
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  setActiveItem(itemName: string, route: string): void {
    this.activeItem = itemName;
    if (route) {
      this.router.navigate([route]);
    }
  }

  enroll(course: Course) {
    alert(`Vous êtes inscrit au cours : ${course.name}`);
    // ici tu peux appeler un service pour enregistrer l'inscription
  }

  filteredCourses(): Course[] {
    if (!this.searchTerm) return this.courses;
    return this.courses.filter(course =>
      course.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
