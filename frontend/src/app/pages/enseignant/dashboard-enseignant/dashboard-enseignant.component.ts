import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-enseignant.component.html',
  styleUrls: ['./dashboard-enseignant.component.css']
})
export class TeacherDashboardComponent implements OnInit {
  userName: string = 'Utilisateur';
  isSidebarOpen = true;

  menuItems = [
    { name: 'Accueil', icon: 'fa-solid fa-home', color: '#1a3b5f', route: '/dashboard-enseignant' },
    { name: 'Créer un cours', icon: 'fa-solid fa-plus', color: '#1a3b5f', route: '/dashboard-enseignant/create-course' },
    { name: 'Mes cours', icon: 'fa-solid fa-book', color: '#1a3b5f', route: '/dashboard-enseignant/mes-cours' },
    { name: 'Profil', icon: 'fa-solid fa-user', color: '#1a3b5f', route: '/dashboard-enseignant/profil-enseignant' },
    { name: 'Déconnexion', icon: 'fa-solid fa-right-from-bracket', color: '#1a3b5f', route: '#' },
  ];

  activeItem: string = 'Accueil';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserInfo();
    if (user) {
      this.userName = user.sub.split('@')[0];
    }

    // 🔥 Active automatiquement le menu selon la route
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentRoute = event.urlAfterRedirects;

        const active = this.menuItems.find(item => item.route === currentRoute);
        if (active) {
          this.activeItem = active.name;
        }
      });
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  setActiveItem(itemName: string): void {
    if (itemName === 'Déconnexion') {
      this.logout();
    } else {
      this.activeItem = itemName;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
