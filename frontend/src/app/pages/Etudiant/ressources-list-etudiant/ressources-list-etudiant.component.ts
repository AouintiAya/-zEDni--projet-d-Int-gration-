import { Component, Input, OnInit } from '@angular/core';
import { CoursService } from 'src/app/services/coursService/cours.service';
import { Location } from '@angular/common';
export interface RessourceDTO {
  id: number;
  titre: string;
  type: string;
  url: string;
  coursId: number;
}
@Component({
  selector: 'app-ressources-list-etudiant',
  templateUrl: './ressources-list-etudiant.component.html',
  styleUrls: ['./ressources-list-etudiant.component.css']
})
export class RessourcesListEtudiantComponent implements OnInit {

 @Input() courseId!: number;
   ressources: RessourceDTO[] = [];
   loading = false;
 
   constructor(private coursService: CoursService,private location: Location) {}
 
   ngOnInit(): void {
     if (this.courseId) this.loadRessources();
   }
 
   ngOnChanges(): void {
     if (this.courseId) this.loadRessources();
   }
   openResource(r: RessourceDTO): void {
     try {
       console.log('Ouverture ressource:', r);
 
       // Si c'est un lien externe, on l'ouvre directement.
       if (r.type === 'LIEN') {
         // si l'URL n'a pas le protocole, ajoute http://
         const link = r.url.startsWith('http') ? r.url : `http://${r.url}`;
         window.open(link, '_blank');
         return;
       }
 
       // Pour les fichiers (PDF, VIDEO, DOCUMENT), on construit l'URL complète côté serveur.
       // Ajuste la base si nécessaire.
       const base = 'http://localhost:9091';
       const fileUrl = r.url.startsWith('http') ? r.url : `${base}${r.url}`;
 
       // PDF : ouvrir dans un nouvel onglet (le navigateur affichera le PDF si possible)
       if (r.type === 'PDF') {
         window.open(fileUrl, '_blank');
         return;
       }
 
       // VIDEO : ouvrir dans un nouvel onglet (ou rediriger vers une page player dédiée)
       if (r.type === 'VIDEO') {
         // Option 1 : ouvrir directement le fichier vidéo (le navigateur pourra le lire)
         window.open(fileUrl, '_blank');
         return;
       }
 
       // DOCUMENT ou autres types : forcer le téléchargement
       // Crée un <a> temporaire pour forcer le download si le serveur renvoie Content-Disposition
       const a = document.createElement('a');
       a.href = fileUrl;
       a.target = '_blank';
       // si tu veux forcer le téléchargement, décommenter la ligne suivante :
       // a.download = r.titre || 'download';
       document.body.appendChild(a);
       a.click();
       a.remove();
     } catch (err) {
       console.error("Erreur lors de l'ouverture de la ressource", err);
       alert(
         "Impossible d'ouvrir la ressource. Voir la console pour plus de détails."
       );
     }
   }
 
   loadRessources() {
     this.loading = true;
 
     console.log('📡 Chargement des ressources pour cours ID =', this.courseId);
 
     this.coursService.getRessourcesByCours(this.courseId).subscribe({
       next: (res) => {
         console.log('📥 Ressources reçues :', res);
 
         this.ressources = res;
         this.loading = false;
       },
       error: (err) => {
         console.error('❌ Erreur de récupération ressources :', err);
         this.loading = false;
       },
     });
   }

   goBack(): void {
  this.location.back();
}
 }
 