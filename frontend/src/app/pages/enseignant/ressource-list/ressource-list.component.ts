import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

interface Ressource {
  id: number;
  courseId: number;   // 🔹 ajouter cette ligne
  titre: string;
  type: string; // PDF, Vidéo, Lien, Document
  url?: string;      // pour lien externe ou PDF/vidéo accessible
  fileName?: string; // pour fichier uploadé depuis le PC
}


@Component({
  selector: 'app-ressource-list',
  templateUrl: './ressource-list.component.html',
  styleUrls: ['./ressource-list.component.css']
})
export class RessourceListComponent implements OnChanges {

  @Input() courseId!: number;
  ressources: Ressource[] = [];

  // Liste complète de toutes les ressources
  allRessources: Ressource[] = [
  { id: 1, courseId: 1, titre: 'Chapitre 1 - Intro', type: 'PDF', url: 'assets/docs/ch1.pdf' },
  { id: 2, courseId: 1, titre: 'Vidéo Démo', type: 'Vidéo', url: 'https://youtu.be/demo' },
  { id: 3, courseId: 2, titre: 'Document Support', type: 'Document', fileName: 'support.docx' },
  { id: 4, courseId: 1, titre: 'Fichier PDF cours', type: 'PDF', fileName: 'cours2.pdf' }
];


  
  constructor(private router: Router) {}

  ngOnChanges(): void {
  if (this.courseId) {
    this.ressources = this.allRessources.filter(r => r.courseId === this.courseId);
  }
}

openResource(r: Ressource) {
  this.router.navigate(['/dashboard-enseignant/ressource', r.id]);
}




}
