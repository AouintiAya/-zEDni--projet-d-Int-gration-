import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CoursDTO, CoursService } from 'src/app/services/coursService/cours.service';

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
  courses: CoursDTO[] = [];
  filteredCourses: CoursDTO[] = [];
  searchQuery: string = '';

  editingCourseId?: number;
  selectedImage?: File;

  // 🔥 Toute la data d’édition dans un seul objet propre
  editData = {
    titre: '',
    description: ''
  };

  constructor(private coursService: CoursService, private router: Router) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.coursService.getMyCours().subscribe({
      next: (res) => {
        this.courses = res;
        this.filteredCourses = res;
      },
      error: (err) => console.error(err)
    });
  }

  onSearch(): void {
    const q = this.searchQuery.toLowerCase();
    this.filteredCourses = this.courses.filter(c =>
      c.titre.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  }

  createCourse(): void {
    console.log("Creating new course...");
    // Naviguer vers la page de création
    this.router.navigate(['/dashboard-enseignant/create-course']);
  }

  // ------------------ //
  //       EDITION
  // ------------------ //

  startEditCourse(course: any) {
    this.editingCourseId = course.id;
    this.editData = {
      titre: course.titre,
      description: course.description
    };
    this.selectedImage = undefined;
  }

  cancelEditCourse() {
    this.editingCourseId = undefined;
    this.selectedImage = undefined;
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  updateCourse(course: any) {
    this.coursService.updateCourse(
      course.id,
      this.editData.titre,
      this.editData.description,
      this.selectedImage
    )
    .subscribe({
      next: (updated) => {
        Object.assign(course, updated); // mise à jour immédiate UI
        this.editingCourseId = undefined;
        this.selectedImage = undefined;
      },
      error: (err) => console.error("Update failed", err)
    });
  }

  deleteCourse(id: number) {
    if (!confirm("Supprimer ce cours ?")) return;

    this.coursService.deleteCourse(id).subscribe({
      next: () => this.courses = this.courses.filter(c => c.id !== id),
      error: (err) => console.error(err)
    });
  }
}
