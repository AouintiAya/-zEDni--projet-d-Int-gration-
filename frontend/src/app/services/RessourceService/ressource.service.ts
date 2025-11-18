import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface RessourceDTO {
  id: number;
  titre: string;
  type: string;
  url: string;
  coursId: number;
}

export interface RessourceCreateRequest {
  titre: string;
  type: string; // LINK
  url?: string;
  coursId: number;
}
@Injectable({
  providedIn: 'root'
})

export class RessourceService {

  private apiUrl = 'http://localhost:9091/api/ressource';

  constructor(private http: HttpClient) { }

  // Ajouter un lien
  createLink(req: RessourceCreateRequest): Observable<RessourceDTO> {
    const token = localStorage.getItem('token') || '';
    return this.http.post<RessourceDTO>(`${this.apiUrl}/link`, req, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // Upload fichier PDF ou vidéo
  uploadFile(file: File, titre: string, type: string, coursId: number): Observable<RessourceDTO> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('titre', titre);
    formData.append('type', type);
    formData.append('coursId', coursId.toString());

    const token = localStorage.getItem('token') || '';
    return this.http.post<RessourceDTO>(`${this.apiUrl}/upload`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // Récupérer les ressources d'un cours
  getByCours(coursId: number): Observable<RessourceDTO[]> {
    return this.http.get<RessourceDTO[]>(`${this.apiUrl}/cours/${coursId}`);
  }

  // Supprimer une ressource
  delete(id: number): Observable<string> {
    const token = localStorage.getItem('token') || '';
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'text'
    });
  }
}
