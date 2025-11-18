import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-ressource',
  templateUrl: './add-ressource.component.html',
  styleUrls: ['./add-ressource.component.css']
})
export class AddRessourceComponent implements OnInit {

  courseId!: number;

  // Objet ressource
  ressource = {
    titre: '',
    type: '',
    url: '',
    file: null as File | null, // Pour stocker le fichier sélectionné
    course_id: 0
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.ressource.course_id = this.courseId;
  }

  // Méthode pour récupérer le fichier choisi
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.ressource.file = file;
      console.log("Fichier sélectionné :", file.name);
    }
  }

  onSubmit() {
    console.log("Nouvelle ressource :", this.ressource);

    if (this.ressource.type === 'Lien') {
      console.log("Ajouter un lien :", this.ressource.url);
    } else {
      console.log("Ajouter un fichier :", this.ressource.file);
    }

    alert("Ressource ajoutée avec succès !");
    this.router.navigate(['/dashboard-enseignant/course-details', this.courseId]);
  }
}
