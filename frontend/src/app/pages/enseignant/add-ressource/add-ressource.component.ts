import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RessourceService,RessourceCreateRequest } from 'src/app/services/RessourceService/ressource.service';
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
        next: () => this.router.navigate(['/dashboard-enseignant/course-details', this.courseId]),
        error: err => console.error(err)
      });
    } else {
      if (!this.ressource.file) return;
      this.resService.uploadFile(this.ressource.file, this.ressource.titre, this.ressource.type, this.courseId)
        .subscribe({
          next: () => this.router.navigate(['/dashboard-enseignant/course-details', this.courseId]),
          error: err => console.error(err)
        });
    }
  }
  goBack() {
    this.router.navigate(['/dashboard-enseignant/course-details', this.courseId]);
  }

  removeFile() {
    this.ressource.file = null;
  }

  getFileAccept(): string {
    switch (this.ressource.type) {
      case 'PDF': return '.pdf';
      case 'Vidéo': return 'video/*';
      case 'Document': return '.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt';
      default: return '';
    }
  }

  getUploadHint(): string {
    switch (this.ressource.type) {
      case 'PDF': return 'Formats PDF uniquement';
      case 'Vidéo': return 'Formats vidéo (MP4, AVI, etc.)';
      case 'Document': return 'Documents Word, Excel, PowerPoint';
      default: return '';
    }
  }

  getFileSize(size: number): string {
    if (size < 1024) return size + ' B';
    else if (size < 1024 * 1024) return (size / 1024).toFixed(2) + ' KB';
    else return (size / (1024 * 1024)).toFixed(2) + ' MB';
  }
}
