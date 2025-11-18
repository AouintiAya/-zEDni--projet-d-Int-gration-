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

  getFileAccept(): string {
  switch (this.ressource.type) {
    case 'PDF':
      return '.pdf';
    case 'Vidéo':
      return '.mp4,.avi,.mov,.mkv';
    case 'Document':
      return '.doc,.docx,.xls,.xlsx,.ppt,.pptx';
    default:
      return '*/*';
  }
}

getUploadHint(): string {
  switch (this.ressource.type) {
    case 'PDF':
      return 'PDF jusqu\'à 50 MB';
    case 'Vidéo':
      return 'Vidéo jusqu\'à 500 MB (MP4, AVI, MOV, MKV)';
    case 'Document':
      return 'Document jusqu\'à 50 MB (Word, Excel, PowerPoint)';
    default:
      return 'Fichier jusqu\'à 50 MB';
  }
}

getFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

removeFile(): void {
  this.ressource.file = null;
}

goBack(): void {
  this.router.navigate(['/dashboard-enseignant/detailCours', this.courseId]);
}


}
