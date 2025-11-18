import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ExamenDTO {
  id: number;
  titre: string;
  url: string;
  corrige: boolean;
  idCours: number;
}

export interface ParticipationExamenDTO {
  id: number;
  student: { nom: string; email: string };
  note?: number;
  urlSoumission: string;
  corrige: boolean;
  examenId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  private apiUrl = 'http://localhost:9091/api/examen';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log('Token utilisé pour requête:', token);
    return new HttpHeaders({
      Authorization: `Bearer ${token || ''}`
    });
  }

  getExamensByCours(coursId: number): Observable<ExamenDTO[]> {
    console.log('Récupération des examens pour le cours', coursId);
    return this.http.get<ExamenDTO[]>(`${this.apiUrl}/cours/${coursId}`, { headers: this.getHeaders() });
  }

  getParticipationsByExamen(examenId: number): Observable<ParticipationExamenDTO[]> {
    console.log('Récupération des participations pour l’examen', examenId);
    return this.http.get<ParticipationExamenDTO[]>(`${this.apiUrl}/${examenId}/participations`, { headers: this.getHeaders() });
  }

  addExamen(formData: FormData): Observable<ExamenDTO> {
    console.log('Ajout d’un examen avec FormData:', formData);
    return this.http.post<ExamenDTO>(`${this.apiUrl}/save`, formData, { headers: this.getHeaders() });
  }

  gradeParticipation(request: { participationId: number; note: number }): Observable<ParticipationExamenDTO> {
    console.log('Notation de la participation:', request);
    return this.http.post<ParticipationExamenDTO>(`${this.apiUrl}/note`, request, { headers: this.getHeaders() });
  }
}
