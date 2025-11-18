import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CoursDTO {
dateInscription: string|number|Date;
  id: number;
  titre: string;
  description: string;
  enseignantEmail: string;
  ressources: any[];
  imageUrl?: string; // optionnel, on peut utiliser une image par défaut
}
export interface ParticipationCoursDto {
  coursId: any;
  titreCours: any;
  id: number;
  dateInscription: string;
  cours: CoursDTO;
  imageUrl?: CoursDTO['imageUrl'];
  description?: CoursDTO['description'];
}
@Injectable({
  providedIn: 'root'
})
export class CoursService {

  private apiUrl = 'http://localhost:9091/api/cours';
  private participationUrl = 'http://localhost:9091/api/participation';


  constructor(private http: HttpClient) { }

  getAllCours(): Observable<CoursDTO[]> {
    return this.http.get<CoursDTO[]>(`${this.apiUrl}/all`);
  }

  getCoursById(id: number): Observable<CoursDTO> {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found. User might not be logged in.');
  }
  return this.http.get<CoursDTO>(`${this.apiUrl}/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
}

inscrireAuCours(coursId: number): Observable<string> {
  const token = localStorage.getItem('token');
  console.log('Token retrieved:', token);  // Add this for debugging
  if (!token) {
    throw new Error('No token found. User might not be logged in.');
  }
  return this.http.post(
    `http://localhost:9091/api/participation/cours/${coursId}/inscrire`,
    {},
    {
      responseType: 'text',
      headers: { 'Authorization': `Bearer ${token}` }
    }
  );
}
getMyCourses(): Observable<ParticipationCoursDto[]> {
  const token = localStorage.getItem('token'); // le JWT
  return this.http.get<ParticipationCoursDto[]>(
    `${this.participationUrl}/etudiant/mes-cours`,
    {
      headers: { 'Authorization': `Bearer ${token}` }
    }
  );
}
}
