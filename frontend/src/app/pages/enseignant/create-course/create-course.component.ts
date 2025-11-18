import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  coursForm!: FormGroup;
  selectedFile: File | null = null;
  selectedFilePreview: string | ArrayBuffer | null = null;
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.coursForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  // Gestion du fichier image
  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.selectedFilePreview = reader.result;
      reader.readAsDataURL(this.selectedFile!);
    }
  }

  onSubmit(): void {
    if (this.coursForm.valid) {
      this.isSubmitting = true;

      // Simuler l'upload et création du cours
      const newCourse = {
        titre: this.coursForm.value.titre,
        description: this.coursForm.value.description,
        imageFile: this.selectedFile
      };

      console.log('Cours créé :', newCourse);

      setTimeout(() => {
        this.isSubmitting = false;
        this.coursForm.reset();
        this.selectedFile = null;
        this.selectedFilePreview = null;
        alert('Cours créé avec succès !');
      }, 1000);
    } else {
      alert('Veuillez remplir tous les champs requis.');
    }
  }

  get isTitleInvalid(): boolean {
    const control = this.coursForm.get('titre');
    return !!(control && control.invalid && control.touched);
  }

  get isDescriptionInvalid(): boolean {
    const control = this.coursForm.get('description');
    return !!(control && control.invalid && control.touched);
  }
}
