package com.zedni.backend.service;

import com.zedni.backend.dto.Quiz.ParticipationQuizResponseDTO;
import com.zedni.backend.dto.Quiz.QuizNotationRequest;
import com.zedni.backend.dto.Quiz.QuizResponseDTO;
import com.zedni.backend.dto.Quiz.QuizSubmissionRequest;
import com.zedni.backend.model.ParticipationQuiz;
import com.zedni.backend.model.Quiz;

import java.util.List;

public interface QuizService {
    // Enseignant: Créer/Mettre à jour un quiz (avec ses questions)
    QuizResponseDTO  saveQuiz(QuizResponseDTO  quiz);

    // Etudiant: Soumettre sa participation (avec ses réponses)
    ParticipationQuizResponseDTO submitParticipation(QuizSubmissionRequest request, String studentEmail);

    // Enseignant: Noter une participation
    ParticipationQuizResponseDTO noteParticipation(QuizNotationRequest request);

    // Général: Récupérer un quiz par ID
    QuizResponseDTO getQuizById(Long quizId);

    // Enseignant: Voir toutes les participations pour un quiz
    List<ParticipationQuizResponseDTO> getParticipationsByQuizId(Long quizId);

    // Etudiant: Voir sa participation
    ParticipationQuizResponseDTO getParticipationByQuizAndStudent(Long quizId, String studentEmail);

    void deleteQuiz(Long id);
}
