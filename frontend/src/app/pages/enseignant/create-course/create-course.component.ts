import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


interface CourseFile {
  file: File;
  preview?: string;
}

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  coursForm!: FormGroup;
  selectedFiles: CourseFile[] = []; // <-- utiliser CourseFile ici
  successMessage: string = '';
  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.coursForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      contenu: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  onFileSelected(event: any): void {
    const files = Array.from(event.target.files) as File[];

    files.forEach(file => {
      if (this.isValidFile(file)) {
        const courseFile: CourseFile = { file };

        // Create preview for images
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            courseFile.preview = e.target.result;
          };
          reader.readAsDataURL(file);
        }

        this.selectedFiles.push(courseFile);
      }
    });
  }

  isValidFile(file: File): boolean {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'video/mp4'];

    if (file.size > maxSize) {
      this.errorMessage = `Le fichier ${file.name} dépasse 10MB.`;
      return false;
    }

    if (!allowedTypes.includes(file.type)) {
      this.errorMessage = `Le type de fichier ${file.type} n'est pas autorisé.`;
      return false;
    }

    return true;
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  onSubmit(): void {
    if (this.coursForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';

      // Simulate API call
      setTimeout(() => {
        const newCourse = {
          titre: this.coursForm.value.titre,
          description: this.coursForm.value.description,
          contenu: this.coursForm.value.contenu,
          fichiers: this.selectedFiles.map(f => f.file.name) // <-- accéder au File
        };

        console.log('Cours créé:', newCourse);

        this.successMessage = 'Cours créé avec succès! Vous serez redirigé dans quelques secondes.';
        this.isSubmitting = false;
        this.coursForm.reset();
        this.selectedFiles = [];

        setTimeout(() => {
          this.successMessage = '';
        }, 4000);
      }, 1500);
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires correctement.';
    }
  }

  // Helpers pour validations
  get isTitleInvalid(): boolean {
    const control = this.coursForm.get('titre');
    return !!(control && control.invalid && control.touched);
  }

  get isDescriptionInvalid(): boolean {
    const control = this.coursForm.get('description');
    return !!(control && control.invalid && control.touched);
  }

  get isContentInvalid(): boolean {
    const control = this.coursForm.get('contenu');
    return !!(control && control.invalid && control.touched);
  }
}
