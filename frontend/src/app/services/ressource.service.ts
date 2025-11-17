import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ressource {
  id?: number;
  titre: string;
  type: string; // pdf, video, image, link
  url: string;
  coursId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class RessourceService {

  private baseUrl = 'http://localhost:9091/api/ressources'; // ajuste selon ton backend

  constructor(private http: HttpClient) { }

  getByCours(coursId: number): Observable<Ressource[]> {
    return this.http.get<Ressource[]>(`${this.baseUrl}/cours/${coursId}`);
  }

  getById(id: number): Observable<Ressource> {
    return this.http.get<Ressource>(`${this.baseUrl}/${id}`);
  }

  createFromLink(ressource: { titre: string, url: string, coursId: number }): Observable<Ressource> {
    return this.http.post<Ressource>(`${this.baseUrl}/link`, ressource);
  }

  uploadFile(file: File, titre: string, type: string, coursId: number): Observable<Ressource> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('titre', titre);
    formData.append('type', type);
    formData.append('coursId', coursId.toString());
    return this.http.post<Ressource>(`${this.baseUrl}/upload`, formData);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
