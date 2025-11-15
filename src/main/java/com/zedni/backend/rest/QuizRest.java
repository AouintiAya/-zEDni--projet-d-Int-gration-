package com.zedni.backend.rest;

import com.zedni.backend.dto.Quiz.*;
import com.zedni.backend.model.ParticipationQuiz;
import com.zedni.backend.model.Quiz;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/quiz")
public interface QuizRest {

    // Enseignant: Créer/Mettre à jour un quiz
    @PostMapping("/save")
    ResponseEntity<QuizResponseDTO > saveQuiz(@RequestBody QuizResponseDTO  quiz);
    // Etudiant: Soumettre sa participation
    @PostMapping("/submit")
    @PreAuthorize("hasAnyAuthority('ROLE_ETUDIANT')")
    ResponseEntity<ParticipationQuizResponseDTO> submitParticipation(@RequestBody QuizSubmissionRequest request);

    // Enseignant: Noter une participation
    @PreAuthorize("hasAuthority('ROLE_ENSEIGNANT')")
    @PostMapping("/note")
    ResponseEntity<ParticipationQuizResponseDTO> noteParticipation(@RequestBody QuizNotationRequest request);

    // Général: Récupérer un quiz par ID
    @PreAuthorize("hasAnyAuthority('ROLE_ENSEIGNANT', 'ROLE_ETUDIANT')")
    @GetMapping("/{quizId}")
    ResponseEntity<QuizResponseDTO> getQuizById(@PathVariable Long quizId);

    // Enseignant: Voir toutes les participations pour un quiz
    @GetMapping("/{quizId}/participations")
    @PreAuthorize("hasAuthority('ROLE_ENSEIGNANT')")
    ResponseEntity<List<ParticipationQuizResponseDTO>> getParticipationsByQuizId(@PathVariable Long quizId);

    // Etudiant: Voir sa participation
    @PreAuthorize("hasAnyAuthority('ROLE_ETUDIANT')")
    @GetMapping("/{quizId}/participation")
    ResponseEntity<ParticipationQuizResponseDTO> getParticipationByQuizAndStudent(@PathVariable Long quizId);

    // Enseignant: supprime quiz
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ENSEIGNANT')")
    public ResponseEntity<String> deleteQuiz(@PathVariable Long id);
}