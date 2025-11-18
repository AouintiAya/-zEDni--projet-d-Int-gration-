import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RessourceCreateRequest, RessourceService } from 'src/app/services/RessourceService/ressource.service';

@Component({
  selector: 'app-add-ressource',
  templateUrl: './add-ressource.component.html',
  styleUrls: ['./add-ressource.component.css']
})
export class AddRessourceComponent implements OnInit {

  courseId!: number;

  ressource = {
    titre: '',
    type: '',
    url: '',
    file: null as File | null,
    course_id: 0
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private resService: RessourceService) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.ressource.course_id = this.courseId;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.ressource.file = file;
    }
  }

  onSubmit() {
    if (this.ressource.type === 'Lien') {
      const req: RessourceCreateRequest = {
        titre: this.ressource.titre,
        type: 'LINK',
        url: this.ressource.url,
        coursId: this.courseId
      };
      this.resService.createLink(req).subscribe({
        next: () => this.router.navigate(['/dashboard-enseignant/detailCours', this.courseId]),
        error: err => console.error(err)
      });
    } else {
      if (!this.ressource.file) return;
      this.resService.uploadFile(this.ressource.file, this.ressource.titre, this.ressource.type, this.courseId)
        .subscribe({
          next: () => this.router.navigate(['/dashboard-enseignant/detailCours', this.courseId]),
          error: err => console.error(err)
        });
    }
  }}
