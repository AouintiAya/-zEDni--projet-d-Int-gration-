// create-course.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute ,Router} from '@angular/router';
import { CoursService } from 'src/app/services/coursService/cours.service';

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

  constructor(
    private fb: FormBuilder, 
    private coursService: CoursService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.coursForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onFileSelected(event: any) {
    const file: File | null = event.target.files && event.target.files[0] ? event.target.files[0] : null;
    this.selectedFile = file;

    if (!file) {
      this.selectedFilePreview = null;
      return;
    }

    // Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedFilePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  // <CHANGE> Added removeImage method to clear selected file
  removeImage() {
    this.selectedFile = null;
    this.selectedFilePreview = null;
  }

  // <CHANGE> Added resetForm method to clear form
  resetForm() {
    this.coursForm.reset();
    this.selectedFile = null;
    this.selectedFilePreview = null;
  }

  onSubmit() {
    if (this.coursForm.invalid) {
      this.coursForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const formData = new FormData();
    formData.append('titre', this.coursForm.value.titre);
    formData.append('description', this.coursForm.value.description);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.coursService.createCours(formData).subscribe({
      next: (res) => {
        alert('Cours créé avec succès !');

        this.resetForm();
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la création du cours');
        this.isSubmitting = false;
      }
    });
  }

  goBack(): void {
  this.router.navigate(['/dashboard-enseignant/mes-cours']);
}

}