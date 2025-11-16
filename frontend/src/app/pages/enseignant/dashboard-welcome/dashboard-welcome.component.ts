import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

interface StatCard {
  icon: string;
  title: string;
  value: string | number;
  unit: string;
  color: string;
}

interface Course {
  id: number;
  title: string;
  students: number;
  rating: number;
  status: string;
  image: string;
}

@Component({
  selector: 'app-dashboard-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-welcome.component.html',
  styleUrls: ['./dashboard-welcome.component.css']
})
export class DashboardWelcomeComponent implements OnInit {
  userName: string = 'Utilisateur';
  filteredCourses: Course[] = [];

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
  ];

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
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.filteredCourses = this.courses;
    const user = this.authService.getUserInfo();
    if (user) {
      this.userName = user.sub.split('@')[0];
    }
  }

  createCourse(): void {
    console.log("Creating new course...");
    // Naviguer vers la page de création
    this.router.navigate(['/dashboard-enseignant/create-course']);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case "En cours":
        return "#2d9cdb";
      case "Complété":
        return "#4caf50";
      case "Brouillon":
        return "#ff9800";
      default:
        return "#545454";
    }
  }
}
