package com.zedni.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Examen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titre;
    private String url; // PDF stocké
    private Boolean corrigé = false;

    @ManyToOne
    @JoinColumn(name = "cours_id")
    private Cours cours;

    @OneToMany(mappedBy = "examen", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<ParticipationExamen> participations;

    @Enumerated(EnumType.STRING)
    private CoursStatus status = CoursStatus.EN_ATTENTE;
}
