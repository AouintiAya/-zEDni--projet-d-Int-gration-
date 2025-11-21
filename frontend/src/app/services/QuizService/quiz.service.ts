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

  // Créer ou mettre à jour un quiz
  saveQuiz(quiz: QuizResponseDTO): Observable<QuizResponseDTO> {
    return this.http.post<QuizResponseDTO>(`${this.baseUrl}/save`, quiz);
  }

  // Soumettre les réponses d'un étudiant
  submitParticipation(request: QuizSubmissionRequest): Observable<ParticipationQuizResponseDTO> {
    return this.http.post<ParticipationQuizResponseDTO>(`${this.baseUrl}/submit`, request);
  }

  // Noter une participation
  noteParticipation(request: QuizNotationRequest): Observable<ParticipationQuizResponseDTO> {
    return this.http.post<ParticipationQuizResponseDTO>(`${this.baseUrl}/note`, request);
  }

  // Récupérer un quiz par son ID
  getQuizById(quizId: number): Observable<QuizResponseDTO> {
    return this.http.get<QuizResponseDTO>(`${this.baseUrl}/${quizId}`);
  }

  // Récupérer toutes les participations d'un quiz
  getParticipationsByQuizId(quizId: number): Observable<ParticipationQuizResponseDTO[]> {
    return this.http.get<ParticipationQuizResponseDTO[]>(`${this.baseUrl}/${quizId}/participations`);
  }

  // Récupérer la participation d'un étudiant pour un quiz
  getParticipationByQuizAndStudent(quizId: number): Observable<ParticipationQuizResponseDTO> {
    return this.http.get<ParticipationQuizResponseDTO>(`${this.baseUrl}/${quizId}/participation`);
  }

  // Supprimer un quiz
  deleteQuiz(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${id}`);
  }
}
