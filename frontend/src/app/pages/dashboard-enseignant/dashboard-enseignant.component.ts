import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { AuthService } from "src/app/services/auth.service"

interface StatCard {
  icon: string
  title: string
  value: string | number
  unit: string
  color: string
}

interface Course {
  id: number
  title: string
  students: number
  rating: number
  status: string
  image: string
}

@Component({
  selector: "app-teacher-dashboard",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-enseignant.component.html',
  styleUrls: ['./dashboard-enseignant.component.css']
})
export class TeacherDashboardComponent implements OnInit {
  constructor(private authService: AuthService) { }
  userName: string = 'Utilisateur'; // valeur par défaut
  searchQuery = ''
  isSidebarOpen = false
  activeItem: string = 'Tableau de bord' // par défaut

  statCards: StatCard[] = [
    {
      icon: "📚",
      title: "Cours créés",
      value: 8,
      unit: "cours",
      color: "#1a3b5f",
    },
    {
      icon: "👥",
      title: "Étudiants inscrits",
      value: 245,
      unit: "étudiants",
      color: "#2d9cdb",
    },
    {
      icon: "💰",
      title: "Revenus totaux",
      value: 2450,
      unit: "€",
      color: "#f2c94c",
    },
  ]

  courses: Course[] = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      students: 45,
      rating: 4.8,
      status: "En cours",
      image: "assets/images/css.jpg",
    },
    {
      id: 2,
      title: "Programmation Python",
      students: 32,
      rating: 4.9,
      status: "En cours",
      image: "assets/images/python.jpg",
    },
    {
      id: 3,
      title: "Cybersécurité",
      students: 28,
      rating: 4.7,
      status: "Complété",
      image: "assets/images/cyber.jpg",
    },
    {
      id: 4,
      title: "Intelligence Artificielle",
      students: 36,
      rating: 4.6,
      status: "En cours",
      image: "assets/images/ai.jpg",
    },

  ]

  filteredCourses: Course[] = []
  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.filteredCourses = this.courses
    } else {
      this.filteredCourses = this.courses.filter((course) =>
        course.title.toLowerCase().includes(this.searchQuery.toLowerCase()),
      )
    }
  }

  createCourse(): void {
    console.log("Creating new course...")
  }

  logout(): void {
    console.log("Logging out...")
  }

  getStatusColor(status: string): string {
    switch (status) {
      case "En cours":
        return "#2d9cdb"
      case "Complété":
        return "#4caf50"
      case "Brouillon":
        return "#ff9800"
      default:
        return "#545454"
    }
  }

  menuItems = [
    { name: 'Tableau de bord', icon: 'fa-solid fa-home', color:'#1a3b5f' , route: '#' },
    { name: 'Cours', icon: 'fa-solid fa-book', color:'#1a3b5f', route: '#' },
    { name: 'Profil', icon: 'fa-solid fa-user', color:'#1a3b5f', route: '#' },
    { name: 'Paramètres', icon: 'fa-solid fa-gear', color:'#1a3b5f', route: '#' },
  ];

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  setActiveItem(itemName: string): void {
  this.activeItem = itemName;
}

ngOnInit(): void {
    this.filteredCourses = this.courses
    const user = this.authService.getUserInfo();
    if (user) {
      // ici, tu peux personnaliser le nom
      // par exemple, afficher seulement la partie avant le @ de l'email
      this.userName = user.sub.split('@')[0];
    }
  }
}
