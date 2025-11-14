import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  current = 0; // index de la slide

  scrollToFormations() {
    const formations = document.getElementById('formations');
    if (formations) {
      formations.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  ngAfterViewInit() {
    // --- Animation des sections ---
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));


    const slides = document.querySelectorAll('.carousel-item');
    const inner = document.querySelector('.carousel-inner') as HTMLElement;
    const prev = document.querySelector('.prev') as HTMLElement;
    const next = document.querySelector('.next') as HTMLElement;

    const total = slides.length;

    const showSlide = (index: number) => {
      if (index < 0) this.current = total - 1;
      else if (index >= total) this.current = 0;
      else this.current = index;

      inner.style.transform = `translateX(-${this.current * 100}%)`;
    };

    prev.addEventListener('click', () => showSlide(this.current - 1));
    next.addEventListener('click', () => showSlide(this.current + 1));
  }

  
}
