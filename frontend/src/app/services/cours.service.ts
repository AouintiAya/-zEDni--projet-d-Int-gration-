import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cours {
  id?: number;
  titre: string;
  description: string;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  private baseUrl = 'http://localhost:9091/api/cours';

  constructor(private http: HttpClient) { }

  // 🔹 Récupérer tous les cours
  getAll(): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${this.baseUrl}/all`);
  }

  // 🔹 Récupérer un cours par ID
  getById(id: number): Observable<Cours> {
    return this.http.get<Cours>(`${this.baseUrl}/${id}`);
  }

  // 🔹 Créer un cours (FormData + JWT)
  create(formData: FormData): Observable<Cours> {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
    console.log('Création cours - Headers:', headers);
    return this.http.post<Cours>(`${this.baseUrl}/add`, formData, { headers });
  }

  // 🔹 Mettre à jour un cours (FormData + JWT)
  update(id: number, formData: FormData): Observable<Cours> {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
    return this.http.put<Cours>(`${this.baseUrl}/${id}/update`, formData, { headers });
  }

  // 🔹 Supprimer un cours (JWT)
  delete(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
  }
}
