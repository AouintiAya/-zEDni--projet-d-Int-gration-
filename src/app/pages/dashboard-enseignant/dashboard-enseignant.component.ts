import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

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
  teacherName = "Dr. Mohamed Achraf"
  teacherEmail = "mohammed@example.com"
  teacherAvatar = "MA"
  searchQuery = ""

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
      image: "/web-development.jpg",
    },
    {
      id: 2,
      title: "Angular Advanced Patterns",
      students: 32,
      rating: 4.9,
      status: "En cours",
      image: "/angular.jpg",
    },
    {
      id: 3,
      title: "TypeScript Mastery",
      students: 28,
      rating: 4.7,
      status: "Complété",
      image: "/typescript-logo.png",
    },
    {
      id: 4,
      title: "Database Design",
      students: 36,
      rating: 4.6,
      status: "En cours",
      image: "/database-concept.png",
    },
    {
      id: 5,
      title: "Mobile Development",
      students: 41,
      rating: 4.8,
      status: "En cours",
      image: "/modern-smartphone-display.png",
    },
    {
      id: 6,
      title: "Backend Architecture",
      students: 29,
      rating: 4.5,
      status: "Brouillon",
      image: "/backend-architecture.png",
    },
  ]

  filteredCourses: Course[] = []

  ngOnInit(): void {
    this.filteredCourses = this.courses
  }

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
}
