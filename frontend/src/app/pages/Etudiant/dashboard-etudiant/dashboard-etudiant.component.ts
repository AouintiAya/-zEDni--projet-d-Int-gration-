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

interface StatCard {
  icon: string;
  title: string;
  value: number;
  unit?: string;
  color?: string;
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

statCards: StatCard[] = [
  {
    icon: '📚',
    title: 'Cours inscrits',
    value: 0,
    unit: 'cours',
    color: '#1a73e8',
  },
  {
    icon: '📝',
    title: 'Quiz complétés',
    value: 0,
    unit: 'quiz',
    color: '#fbbc04',
  },
  {
    icon: '🎓',
    title: 'Examens réussis',
    value: 0,
    unit: 'examens',
    color: '#34a853',
  }
];

  menuItems: MenuItem[] = [
    { name: 'Tableau de bord', icon: 'fa-solid fa-home', color: '#1a3b5f', route: '/dashboard-etudiant' },
    { name: 'Cours', icon: 'fa-solid fa-book', color: '#1a3b5f', route: '/dashboard-etudiant/cours' },
    { name: 'Profil', icon: 'fa-solid fa-user', color: '#1a3b5f', route: '/dashboard-etudiant/profile' },
  ];
  myCourses: any[] = []; // Remplir avec les cours de l'étudiant
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
  filteredMyCourses() {
  // Si tu as un tableau myCourses provenant du backend
  return this.myCourses || [];
}

openCourse(course: any) {
  this.router.navigate(['/dashboard-etudiant/cours', course.id]);
}

}
