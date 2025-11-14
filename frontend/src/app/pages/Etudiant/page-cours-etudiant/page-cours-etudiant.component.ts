import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-cours-etudiant',
  templateUrl: './page-cours-etudiant.component.html',
  styleUrls: ['./page-cours-etudiant.component.css']
})
export class PageCoursEtudiantComponent implements OnInit {

  isSidebarOpen = false;
  activeItem = 'Cours';

  menuItems = [
    { name: 'Tableau de bord', icon: 'fa-solid fa-home', color: '#1a3b5f', route: '/dashboard-etudiant' },
    { name: 'Cours', icon: 'fa-solid fa-book', color: '#1a3b5f', route: '/cours' },
    { name: 'Profil', icon: 'fa-solid fa-user', color: '#1a3b5f', route: '/profile' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // ici on peut charger des données si nécessaire
  }

  goToMyCourses() {
    this.router.navigate(['/mescours']);
  }

  goToAvailableCourses() {
    this.router.navigate(['/coursdisponible']);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  setActiveItem(itemName: string, route: string): void {
    this.activeItem = itemName;
    if (route) {
      this.router.navigate([route]);
    }
  }
}
