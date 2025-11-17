import { Component, OnInit } from '@angular/core';

interface Cours {
  id: number;
  titre: string;
  description: string;
  imageUrl: string;
  categorie: string;
}

@Component({
  selector: 'app-catalogue-cours',
  templateUrl: './catalogue-cours.component.html',
  styleUrls: ['./catalogue-cours.component.css']
})
export class CatalogueCoursComponent implements OnInit {

  courses: Cours[] = [];
  filteredCourses: Cours[] = [];
  categories: string[] = ['Math', 'Physique', 'Informatique', 'Chimie'];
  selectedCategory: string = '';
  isLoading: boolean = true;

  ngOnInit(): void {
    // Simuler un chargement
    setTimeout(() => {
      this.courses = [
        {
          id: 1,
          titre: 'Algèbre Linéaire',
          description: 'Cours d’algèbre linéaire pour débutants.',
          imageUrl: 'https://via.placeholder.com/400x200?text=Algebre',
          categorie: 'Math'
        },
        {
          id: 2,
          titre: 'Physique Classique',
          description: 'Introduction à la physique classique.',
          imageUrl: 'https://via.placeholder.com/400x200?text=Physique',
          categorie: 'Physique'
        },
        {
          id: 3,
          titre: 'Programmation en Python',
          description: 'Apprenez les bases de Python.',
          imageUrl: 'https://via.placeholder.com/400x200?text=Python',
          categorie: 'Informatique'
        },
        {
          id: 4,
          titre: 'Chimie Organique',
          description: 'Découverte de la chimie organique.',
          imageUrl: 'https://via.placeholder.com/400x200?text=Chimie',
          categorie: 'Chimie'
        }
      ];
      this.filteredCourses = this.courses;
      this.isLoading = false;
    }, 1000);
  }

  filterCourses() {
    if (this.selectedCategory) {
      this.filteredCourses = this.courses.filter(c => c.categorie === this.selectedCategory);
    } else {
      this.filteredCourses = this.courses;
    }
  }
}
