import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Ressource {
  id: number;
  titre: string;
  type: string;
  url?: string;
  fileName?: string;
}

@Component({
  selector: 'app-ressource-detail',
  templateUrl: './ressource-detail.component.html',
  styleUrls: ['./ressource-detail.component.css']
})
export class RessourceDetailComponent implements OnInit {

  ressourceId!: number;
  ressource!: Ressource;

  // 🔹 Données statiques (IMPORTANT)
  allRessources: Ressource[] = [
    { id: 1, titre: 'Chapitre 1 - PDF', type: 'PDF', fileName: 'ch1.pdf', url: 'assets/docs/ch1.pdf' },
    { id: 2, titre: 'Vidéo Introduction', type: 'Vidéo', url: 'https://youtu.be/demo' },
    { id: 3, titre: 'Document Word', type: 'Document', fileName: 'cours.docx', url: 'assets/docs/cours.docx' },
    { id: 4, titre: 'Lien externe', type: 'Lien', url: 'https://www.google.com' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.ressourceId = Number(this.route.snapshot.paramMap.get('id'));

    this.ressource = this.allRessources.find(r => r.id === this.ressourceId)!;
  }

}
