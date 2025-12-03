import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Pour une question lors de la création d'un quiz
export interface QuestionCreationDTO {
  enonce: string;
  reponseCorrecte: string;
}

// Pour une question lors de l'affichage (frontend ne voit pas la réponse correcte)
export interface QuestionResponseDTO {
  id: number;
  enonce: string;
}

// Pour la création ou mise à jour d'un quiz
export interface QuizResponseDTO {
  titre: string;
  idCours: number;
  questions: QuestionCreationDTO[];
}

// Pour soumettre la participation d'un étudiant
export interface QuizSubmissionRequest {
  quizId: number;
  reponses: { [questionId: number]: string }; // Map<QuestionId, ReponseEtudiant>
}

// Pour la réponse du backend après soumission
export interface ParticipationQuizResponseDTO {
  id: number;
  student: EtudiantDTO;
  note: number;
  reponses: { [questionId: number]: string };
  corrige: boolean;
  quizId: number;
}

// Pour noter une participation
export interface QuizNotationRequest {
  participationId: number;
  note: number;
}

// DTO pour l'étudiant
export interface EtudiantDTO {
  id: number;
  nom: string;
  prenom: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})

export class QuizService {
  private baseUrl = 'http://localhost:9091/api/quiz';

  constructor(private http: HttpClient) {}

  /** Enregistrer ou modifier un quiz */
  saveQuiz(quiz: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/save`, quiz);
  }

  /** Récupérer un quiz */
  getQuizById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  /** Soumettre une participation étudiant */
  submitQuiz(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/submit`, data);
  }

  /** Voir la participation d'un étudiant */
  getMyParticipation(quizId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${quizId}/participation`);
  }

  /** Enseignant : noter la participation */
  noteParticipation(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/note`, data);
  }

  /** Enseignant : participations d’un quiz */
  getQuizParticipations(quizId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${quizId}/participations`);
  }

  /** Supprimer un quiz */
  deleteQuiz(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
