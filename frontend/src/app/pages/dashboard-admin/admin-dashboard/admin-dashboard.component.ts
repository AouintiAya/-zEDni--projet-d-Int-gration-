import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  userName: string = 'Admin';
  isSidebarOpen = true;

  menuItems = [
    { name: 'Accueil', icon: 'fa-solid fa-house', color: '#1a3b5f', route: '/dashboard-admin' },
    { name: 'Cours', icon: 'fa-solid fa-book-open', color: '#1a3b5f', route: '/dashboard-admin/manage-courses' },
    { name: 'Utilisateurs', icon: 'fa-solid fa-users', color: '#1a3b5f', route: '/dashboard-admin/manage-users' },
    { name: 'Rapports', icon: 'fa-solid fa-chart-line', color: '#1a3b5f', route: '/dashboard-admin/reports' },
    { name: 'Profil', icon: 'fa-solid fa-user-cog', color: '#1a3b5f', route: '/dashboard-admin/profile' },
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
      this.userName = user.sub?.split('@')[0] ?? this.userName;
    }

    // Active automatiquement le menu selon la route
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentRoute = event.urlAfterRedirects;
        const active = this.menuItems.find(item => item.route === currentRoute);
        if (active) {
          this.activeItem = active.name;
        } else {
          // cas racine /dashboard-admin -> Accueil
          if (currentRoute === '/dashboard-admin' || currentRoute === '/dashboard-admin/') {
            this.activeItem = 'Accueil';
          }
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

