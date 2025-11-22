import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-liste-etudiants',
  templateUrl: './liste-etudiants.component.html',
  styleUrls: ['./liste-etudiants.component.css']
})
export class ListeEtudiantsComponent implements OnInit {

  // Liste des étudiants actifs
  etudiants: any[] = [];

  // Liste des étudiants en attente
  etudiantsEnAttente: any[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Données locales pour test
    this.etudiants = [
      { nom: 'Aya Aouinti', email: 'aya@test.com' },
      { nom: 'Ali Ben', email: 'ali@test.com' },
      { nom: 'Meryem H.', email: 'meryem@test.com' }
    ];

    this.etudiantsEnAttente = [
      { nom: 'Lina G.', email: 'lina@test.com' },
      { nom: 'Samir K.', email: 'samir@test.com' },
      { nom: 'Sonia R.', email: 'sonia@test.com' }
    ];
  }

  // Actions
  voirUtilisateur(user: any) { 
    console.log('Voir :', user); 
  }

  modifierUtilisateur(user: any) { 
    console.log('Modifier :', user); 
  }

  supprimerUtilisateur(user: any) { 
    console.log('Supprimer :', user); 
  }

  accepterUtilisateur(user: any) { 
    console.log('Accepter :', user); 
    // Pour tester, on peut déplacer l'étudiant vers actifs
    this.etudiants.push(user);
    this.etudiantsEnAttente = this.etudiantsEnAttente.filter(u => u !== user);
  }

  refuserUtilisateur(user: any) { 
    console.log('Refuser :', user); 
    // Supprimer de la liste en attente
    this.etudiantsEnAttente = this.etudiantsEnAttente.filter(u => u !== user);
  }
  retourDashboard() {
    this.router.navigate(['/dashboard-admin/users']); // ou '/dashboard-admin/users'
  }
}
