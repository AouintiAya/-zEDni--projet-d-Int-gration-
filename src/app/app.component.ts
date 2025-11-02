import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'zEDni';

 showMenu = false; //

   toggleMenu() {
    this.showMenu = !this.showMenu;
  }


  ngAfterViewInit() {
  const links = document.querySelectorAll('.nav-links a');

  links.forEach(link => {
    link.addEventListener('click', () => {
      // Supprime la classe active de tous les liens
      links.forEach(l => l.classList.remove('active'));
      // Ajoute la classe active au lien cliqué
      link.classList.add('active');
    });
  });
}

}



