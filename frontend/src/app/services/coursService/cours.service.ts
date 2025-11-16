import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CoursDTO {
  id: number;
  titre: string;
  description: string;
  enseignantEmail: string;
  ressources: any[];
  imageUrl?: string; // Ajoute ceci si ton backend envoie l'URL de l'image
}

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  private apiUrl = 'http://localhost:9091/api/cours';

  constructor(private http: HttpClient) {}

  getAllCours(): Observable<CoursDTO[]> {
    return this.http.get<CoursDTO[]>(`${this.apiUrl}/all`);
  }

  getCoursById(id: number): Observable<CoursDTO> {
    return this.http.get<CoursDTO>(`${this.apiUrl}/${id}`);
  }
}
