import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

interface StatCard {
  label: string;
  value: number;
  icon: string;
  color: string;
}

interface ActionCard {
  title: string;
  description: string;
  icon: string;
  buttonText: string;
  action: () => void;
}

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  // Exemple de données, à remplacer par ton service
  totalStudents: number = 120;
  totalTeachers: number = 25;
  totalCourses: number = 40;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Ici tu peux appeler tes services pour récupérer les vraies données
  }

  // Statistiques
  stats: StatCard[] = [
    { label: 'Étudiants', value: 124, icon: '👨‍🎓', color: '#2d9cdb' },
    { label: 'Enseignants', value: 18, icon: '👩‍🏫', color: '#f2c94c' },
    { label: 'Cours', value: 36, icon: '📚', color: '#1a3b5f' }
  ];

  // Actions
  actions: ActionCard[] = [
    { 
      title: 'Gestion utilisateurs', 
      description: 'Ajouter, modifier ou supprimer des utilisateurs.', 
      icon: '👥', 
      buttonText: 'Gérer', 
      action: () => this.gestionUtilisateurs() 
    },
    { 
      title: 'Gestion cours', 
      description: 'Créer et gérer les cours disponibles.', 
      icon: '📖', 
      buttonText: 'Gérer', 
      action: () => this.gestionCours() 
    },
    { 
      title: 'Rapports', 
      description: 'Consulter les statistiques et rapports.', 
      icon: '📊', 
      buttonText: 'Voir', 
      action: () => this.voirRapports() 
    }
  ];

  // Méthodes d’action
  gestionUtilisateurs() {
    console.log('Clique détecté');
    this.router.navigate(['/dashboard-admin/users']);
  }

  gestionCours() {
    this.router.navigate(['/dashboard-admin/courses']); // adapte la route selon ton projet
  }

  voirRapports() {
    this.router.navigate(['/dashboard-admin/reports']); // adapte la route selon ton projet
  }

}
