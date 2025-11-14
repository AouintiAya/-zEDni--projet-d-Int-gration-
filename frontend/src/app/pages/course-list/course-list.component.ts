import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Course {
  id: number;
  title: string;
  students: number;
  rating: number;
  status: string;
  image: string;
  description?: string;
  lastUpdated?: string;
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  searchQuery = '';
  filteredCourses: Course[] = [];

  courses: Course[] = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      students: 45,
      rating: 4.8,
      status: "En cours",
      image: "assets/images/css.jpg",
      description: "Apprenez les bases du développement web",
      lastUpdated: "2024-01-15"
    },
    {
      id: 2,
      title: "Programmation Python",
      students: 32,
      rating: 4.9,
      status: "En cours",
      image: "assets/images/python.jpg",
      description: "Maîtrisez Python pour la programmation",
      lastUpdated: "2024-01-10"
    },
    {
      id: 3,
      title: "Cybersécurité",
      students: 28,
      rating: 4.7,
      status: "Complété",
      image: "assets/images/cyber.jpg",
      description: "Protégez vos systèmes et données",
      lastUpdated: "2024-01-05"
    },
    {
      id: 4,
      title: "Intelligence Artificielle",
      students: 36,
      rating: 4.6,
      status: "En cours",
      image: "assets/images/ai.jpg",
      description: "Explorez l'IA et le machine learning",
      lastUpdated: "2024-01-12"
    },
  ];

  constructor() { }

  ngOnInit(): void {
    this.filteredCourses = this.courses;
  }

  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.filteredCourses = this.courses;
    } else {
      this.filteredCourses = this.courses.filter((course) =>
        course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.description?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
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

  editCourse(courseId: number): void {
    console.log(`Editing course ${courseId}`);
  }

  deleteCourse(courseId: number): void {
    this.courses = this.courses.filter(c => c.id !== courseId);
    this.onSearch();
  }
}
