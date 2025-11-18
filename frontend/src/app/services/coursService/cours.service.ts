import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CoursDTO {
  dateInscription: string | number | Date;
  id: number;
  titre: string;
  description: string;
  enseignantEmail: string;
  ressources: any[];
  imageUrl?: string; // optionnel, on peut utiliser une image par défaut
  etudiantsCount?: number; // nouveau champ pour le total

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
  providedIn: 'root',
})
export class CoursService {
  private apiUrl = 'http://localhost:9091/api/cours';
  private participationUrl = 'http://localhost:9091/api/participation';

  constructor(private http: HttpClient) {}

  getAllCours(): Observable<CoursDTO[]> {
    return this.http.get<CoursDTO[]>(`${this.apiUrl}/all`);
  }

  getCoursById(id: number): Observable<CoursDTO> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. User might not be logged in.');
    }
    return this.http.get<CoursDTO>(`${this.apiUrl}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  createCours(formData: FormData): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // <-- only Authorization
    });

    // DO NOT set Content-Type manually for FormData
    return this.http.post(`${this.apiUrl}/add`, formData, { headers });
  }
  getMyCours(): Observable<CoursDTO[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<CoursDTO[]>(`${this.apiUrl}/enseignant/my-cours`, {
      headers,
    });
  }
  deleteCourse(courseId: number): Observable<any> {
    const token = localStorage.getItem('token'); // JWT token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete(`${this.apiUrl}/${courseId}`, {
      responseType: 'text',
    });
  }

  updateCourse(
    id: number,
    titre?: string,
    description?: string,
    image?: File
  ): Observable<CoursDTO> {
    const formData = new FormData();
    if (titre) formData.append('titre', titre);
    if (description) formData.append('description', description);
    if (image) formData.append('image', image);

    return this.http.put<CoursDTO>(`${this.apiUrl}/${id}/update`, formData);
  }

  inscrireAuCours(coursId: number): Observable<string> {
    const token = localStorage.getItem('token');
    console.log('Token retrieved:', token); // Add this for debugging
    if (!token) {
      throw new Error('No token found. User might not be logged in.');
    }
    return this.http.post(
      `http://localhost:9091/api/participation/cours/${coursId}/inscrire`,
      {},
      {
        responseType: 'text',
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  getMyCourses(): Observable<ParticipationCoursDto[]> {
    const token = localStorage.getItem('token'); // le JWT
    return this.http.get<ParticipationCoursDto[]>(
      `${this.participationUrl}/etudiant/mes-cours`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
}
