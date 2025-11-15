package com.zedni.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParticipationExamen {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "examen_id")
    @JsonIgnore
    private Examen examen;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Users student;

    private Double note; // remplie par l'enseignant
    private String urlSoumission; // Lien vers le fichier soumis par l'étudiant (e.g., PDF)
    private Boolean corrigé = false;

}
