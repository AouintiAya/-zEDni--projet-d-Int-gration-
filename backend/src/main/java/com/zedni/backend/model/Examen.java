package com.zedni.backend.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    
}
