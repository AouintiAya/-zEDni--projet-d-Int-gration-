import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ExamenDTO {
  id?: number;
  titre: string;
  url?: string;
  idCours: number;
}

export interface EtudiantDTO {
  nom: string;
  email: string;
}

export interface ParticipationExamenDTO {
  id: number;
  student: EtudiantDTO;
  note?: number;
  urlSoumission: string;
  corrige: boolean;
  examenId: number;
}

export interface ExamenNotationRequest {
  participationId: number;
  note: number;
}

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  private apiUrl = 'http://localhost:9091/api/examen';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  /** Ajouter un examen (JSON) */
  saveExamen(examen: ExamenDTO): Observable<ExamenDTO> {
    return this.http.post<ExamenDTO>(`${this.apiUrl}/save`, examen, {
      headers: this.getHeaders()
    });
  }

  getExamensByCours(idCours: number): Observable<ExamenDTO[]> {
    return this.http.get<ExamenDTO[]>(`${this.apiUrl}/cours/${idCours}`, {
      headers: this.getHeaders()
    });
  }

  getParticipationsByExamen(examId: number): Observable<ParticipationExamenDTO[]> {
    return this.http.get<ParticipationExamenDTO[]>(`${this.apiUrl}/${examId}/participations`, {
      headers: this.getHeaders()
    });
  }

  gradeParticipation(request: ExamenNotationRequest): Observable<ParticipationExamenDTO> {
    return this.http.post<ParticipationExamenDTO>(`${this.apiUrl}/note`, request, {
      headers: this.getHeaders()
    });
  }
}
