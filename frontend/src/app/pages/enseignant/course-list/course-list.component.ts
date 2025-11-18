import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CoursDTO, CoursService } from 'src/app/services/coursService/cours.service';

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

  editData = {
    titre: '',
    description: ''
  };

  constructor(private coursService: CoursService, private router: Router) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  // Charger tous les cours de l'enseignant connecté
  loadCourses(): void {
    this.coursService.getMyCours().subscribe({
      next: (res) => {
        this.courses = res;
        this.filteredCourses = [...res]; // clone pour recherche
      },
      error: (err) => console.error(err)
    });
  }

  // Recherche dans les cours
  onSearch(): void {
    const q = this.searchQuery.toLowerCase();
    this.filteredCourses = this.courses.filter(c =>
      c.titre.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  }

  // Redirection vers création d’un nouveau cours
  createCourse(): void {
    this.router.navigate(['/dashboard-enseignant/create-course']);
  }

  // ------------------ //
  //       EDITION
  // ------------------ //

  startEditCourse(course: CoursDTO) {
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

  updateCourse(course: CoursDTO) {
    this.coursService.updateCourse(
      course.id,
      this.editData.titre,
      this.editData.description,
      this.selectedImage
    ).subscribe({
      next: (updated) => {
        Object.assign(course, updated);
        this.editingCourseId = undefined;
        this.selectedImage = undefined;
      },
      error: (err) => console.error("Update failed", err)
    });
  }

  deleteCourse(id: number) {
    if (!confirm("Supprimer ce cours ?")) return;

    this.coursService.deleteCourse(id).subscribe({
      next: () => {
        this.courses = this.courses.filter(c => c.id !== id);
        this.filteredCourses = this.filteredCourses.filter(c => c.id !== id);
      },
      error: (err) => console.error(err)
    });
  }

  // Redirection vers la page de détails du cours
  viewCourse(courseId: number): void {
    this.router.navigate(['/dashboard-enseignant/detailCours', courseId]);
  }
}
