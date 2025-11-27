package com.zedni.backend.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Cours {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;

    private String description;

    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private CoursStatus status = CoursStatus.EN_ATTENTE;

    @JsonIgnoreProperties({"user"})
    @ManyToOne
    @JoinColumn(name = "id_enseignant")
    private Enseignant enseignant;

    @OneToMany(mappedBy = "cours", fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonIgnore
    private List<Ressource> ressources;

    @OneToMany(mappedBy = "cours", fetch = FetchType.LAZY,orphanRemoval = true)
    @JsonIgnore
    private List<Examen> examens;

    @OneToMany(mappedBy = "cours" , orphanRemoval = true)
    @JsonIgnore
    private List<Quiz> quizzes;

    @OneToMany(mappedBy = "cours")
    private List<ParticipationCours> participants;




}
