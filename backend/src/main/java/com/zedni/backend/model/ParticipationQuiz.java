package com.zedni.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.User;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParticipationQuiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Users student;

    private Double note;
    @Column(columnDefinition = "TEXT")
    private String reponses; // Réponses de l'étudiant au format JSON sérialisé
    private Boolean corrigé = false;
}
