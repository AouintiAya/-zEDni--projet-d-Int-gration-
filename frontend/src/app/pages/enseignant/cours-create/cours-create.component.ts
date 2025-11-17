import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoursService } from '../../../services/cours.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-cours-create',
  templateUrl: './cours-create.component.html',
  styleUrls: ['./cours-create.component.css']
})
export class CoursCreateComponent {

  titre = '';
  description = '';
  imageFile: File | null = null;

  constructor(
    private router: Router,
    private coursService: CoursService,
    private authService: AuthService  // 🔹 injecter le service Auth pour récupérer le token
  ) {}

  // 🔹 Récupérer le fichier image
  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
    }
  }

  // 🔹 Soumettre le formulaire
  submit() {
  console.log('Titre:', this.titre);
  console.log('Description:', this.description);
  console.log('Image File:', this.imageFile);

  if (!this.titre || !this.description) {
    alert('Veuillez remplir tous les champs !');
    return;
  }

  const formData = new FormData();
  formData.append('titre', this.titre);
  formData.append('description', this.description);
  if (this.imageFile) {
    formData.append('image', this.imageFile);
  }

  // 🔹 Envoyer le FormData (le token est pris dans le service)
  this.coursService.create(formData).subscribe({
    next: (res) => {
      console.log('Réponse backend:', res);
      alert('Cours créé avec succès !');
      this.router.navigate(['/dashboard-enseignant/mes-cours']);
    },
    error: (err) => {
      console.error('Erreur création cours', err);
      alert('Erreur lors de la création du cours : ' + (err.error?.message || err.message));
    }
  });
}

}
