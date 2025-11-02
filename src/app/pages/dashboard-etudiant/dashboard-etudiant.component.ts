import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface StatCard {
  icon: string;
  title: string;
  value: string | number;
  unit: string;
  color: string;
}

interface Course {
  id: number;
  name: string;
  code: string;
  instructor: string;
  progress: number;
  color: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard-etudiant',
  templateUrl: './dashboard-etudiant.component.html',
  styleUrls: ['./dashboard-etudiant.component.css']
})
export class DashboardEtudiantComponent {
  constructor(private router: Router) { }  // <-- injection du Router

  userName = 'Islem Aissa';
  searchQuery = '';
  isSidebarOpen = false;
  activeItem: string = 'Tableau de bord'; // par défaut

 
  statCards: StatCard[] = [
    {
      icon: "📚",
      title: "Cours inscrits",
      value: 5,
      unit: "cours",
      color: "#2d9cdb",
    },
    {
      icon: "📊",
      title: "Progression moyenne",
      value: 65,
      unit: "%",
      color: "#f2c94c",
    },
    {
      icon: "⏱️",
      title: "Temps d'apprentissage",
      value: 42,
      unit: "h",
      color: "#1a3b5f",
    },
  ]

  courses: Course[] = [
    { id: 1, name: 'Développement Web', code: 'DW-101', instructor: 'Fatima Hassan', progress: 85, color: '#2d9cdb', icon: '📚' },
    { id: 2, name: 'Base de Données', code: 'BD-102', instructor: 'Ali Mohamed', progress: 70, color: '#f2c94c', icon: '🗄️' },
    { id: 3, name: 'Algorithmes', code: 'ALG-103', instructor: 'Hamza Ibrahim', progress: 92, color: '#1a3b5f', icon: '⚙️' },
    { id: 4, name: 'Programmation Python', code: 'PY-104', instructor: 'Noor Ahmed', progress: 78, color: '#2d9cdb', icon: '🐍' },
    { id: 5, name: 'Réseaux Informatiques', code: 'RES-105', instructor: 'Mohamed Ali', progress: 65, color: '#f2c94c', icon: '🌐' }
  ];

  menuItems = [
    { name: 'Tableau de bord', icon: 'fa-solid fa-home', color:'#1a3b5f' , route: '#' },
    { name: 'Cours', icon: 'fa-solid fa-book', color:'#1a3b5f', route: '#' },
    { name: 'Profil', icon: 'fa-solid fa-user', color:'#1a3b5f', route: '#' },
    { name: 'Paramètres', icon: 'fa-solid fa-gear', color:'#1a3b5f', route: '#' },
  ];

  filteredCourses = this.courses;

  filterCourses(): void {
    if (!this.searchQuery.trim()) {
      this.filteredCourses = this.courses;
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredCourses = this.courses.filter(course =>
        course.name.toLowerCase().includes(query) ||
        course.code.toLowerCase().includes(query)
      );
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  
  setActiveItem(itemName: string): void {
  this.activeItem = itemName;
}

   logout(): void {
    // Tu peux aussi supprimer les infos utilisateur ici si nécessaire
    this.router.navigate(['/login']); // redirige vers la page login
  }
}
