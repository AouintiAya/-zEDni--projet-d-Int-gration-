import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-enseignants',
  templateUrl: './liste-enseignants.component.html',
  styleUrls: ['./liste-enseignants.component.css']
})
export class ListeEnseignantsComponent implements OnInit {

  enseignants: any[] = [];
  enseignantsEnAttente: any[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Données locales pour test
    this.enseignants = [
      { nom: 'Mr. Ben', email: 'ben@test.com', matiere: 'Math' },
      { nom: 'Mme. Sana', email: 'sana@test.com', matiere: 'Informatique' }
    ];

    this.enseignantsEnAttente = [
      { nom: 'Mr. Omar', email: 'omar@test.com', matiere: 'Physique' },
      { nom: 'Mme. Lina', email: 'lina@test.com', matiere: 'Chimie' }
    ];
  }

  voirUtilisateur(user: any) { console.log('Voir :', user); }
  modifierUtilisateur(user: any) { console.log('Modifier :', user); }
  supprimerUtilisateur(user: any) { console.log('Supprimer :', user); }
  accepterUtilisateur(user: any) {
    console.log('Accepter :', user);
    this.enseignants.push(user);
    this.enseignantsEnAttente = this.enseignantsEnAttente.filter(u => u !== user);
  }
  refuserUtilisateur(user: any) {
    console.log('Refuser :', user);
    this.enseignantsEnAttente = this.enseignantsEnAttente.filter(u => u !== user);
  }

  retourDashboard() {
    this.router.navigate(['/dashboard-admin/users']);
  }
}
