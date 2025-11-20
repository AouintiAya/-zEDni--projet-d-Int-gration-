import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

interface MenuItem {
  name: string;
  icon: string;
  color: string;
  route: string;
}

@Component({
  selector: 'app-dashboard-etudiant',
  templateUrl: './dashboard-etudiant.component.html',
  styleUrls: ['./dashboard-etudiant.component.css'],
})
export class DashboardEtudiantComponent implements OnInit {
  isSidebarOpen = false;
  activeItem: string = 'Tableau de bord';
  userName: string = 'Utilisateur';

  menuItems: MenuItem[] = [
    { name: 'Tableau de bord', icon: 'fa-solid fa-home', color: '#1a3b5f', route: '/dashboard-etudiant' },
    { name: 'Cours', icon: 'fa-solid fa-book', color: '#1a3b5f', route: '/dashboard-etudiant/cours' },
    { name: 'Profil', icon: 'fa-solid fa-user', color: '#1a3b5f', route: '/dashboard-etudiant/profile' },
  ];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getUserInfo();
    if (user) this.userName = user.sub.split('@')[0];

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

  setActiveItem(itemName: string, route: string): void {
    this.activeItem = itemName;
    if (route) this.router.navigate([route]);
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}
