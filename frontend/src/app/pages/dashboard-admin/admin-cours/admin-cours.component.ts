import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-cours',
  templateUrl: './admin-cours.component.html',
  styleUrls: ['./admin-cours.component.css']
})
export class AdminCoursComponent implements OnInit {

  cours: any[] = []; // toutes les données
  coursFiltres: any[] = []; // données filtrées

  // Valeurs de filtre
  filterEnseignant: string = '';
  filterStatut: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getCours();
  }

  getCours() {
    // Données statiques
    this.cours = [
      { id:1, titre:'Math 101', matiere:'Math', enseignant:{nom:'M. Ali'}, statut:'en attente' },
      { id:2, titre:'Physique', matiere:'Phys', enseignant:{nom:'Mme Leila'}, statut:'validé' },
      { id:3, titre:'Chimie 101', matiere:'Chimie', enseignant:{nom:'M. Karim'}, statut:'rejeté' }
    ];
    this.coursFiltres = [...this.cours]; // au départ, tout afficher
  }

  // Appliquer filtre
  appliquerFiltres() {
    this.coursFiltres = this.cours.filter(c => {
      const matchEnseignant = this.filterEnseignant ? c.enseignant.nom.toLowerCase().includes(this.filterEnseignant.toLowerCase()) : true;
      const matchStatut = this.filterStatut ? c.statut === this.filterStatut : true;
      return matchEnseignant && matchStatut;
    });
  }

  // Actions
  ajouterCours() { alert('Ajouter cours'); }
  modifierCours(c: any) { alert('Modifier cours: ' + c.titre); }
  supprimerCours(c: any) { 
    if(confirm("Voulez-vous supprimer ce cours ?")) this.cours = this.cours.filter(x => x.id !== c.id); 
    this.appliquerFiltres();
  }
  voirDetails(c: any) {
  // Chemin complet depuis la racine
  this.router.navigate(['/dashboard-admin/cours', c.id]);
}


  validerCours(c: any) { c.statut = 'validé'; this.appliquerFiltres(); }
  rejeterCours(c: any) { c.statut = 'rejeté'; this.appliquerFiltres(); }
}
