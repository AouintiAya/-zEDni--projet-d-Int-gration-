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
    course_id: 0
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Récupérer l'ID du cours depuis la route
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.ressource.course_id = this.courseId;
  }

  onSubmit() {
    console.log("Nouvelle ressource :", this.ressource);

    alert("Ressource ajoutée avec succès !");

    // Redirection vers détails du cours
    this.router.navigate(['/dashboard-enseignant/course-details', this.courseId]);
  }
}
