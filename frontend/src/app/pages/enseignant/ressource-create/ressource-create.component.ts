import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ressource-create',
  templateUrl: './ressource-create.component.html',
})
export class RessourceCreateComponent {

  titre = '';
  type = 'pdf';
  url = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  submit() {
    const idCours = this.route.snapshot.params['id'];
    console.log('Ressource ajoutée pour cours', idCours, this.titre, this.type, this.url);
    alert('Ressource ajoutée avec succès !');
    this.router.navigate([`/dashboard-enseignant/mes-cours/${idCours}`]);
  }
}
