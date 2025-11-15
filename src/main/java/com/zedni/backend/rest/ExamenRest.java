package com.zedni.backend.rest;

import com.zedni.backend.dto.Examen.*;
import com.zedni.backend.model.Examen;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/examen")
public interface ExamenRest {

    // Enseignant: Créer/Mettre à jour un examen
    @PreAuthorize("hasAuthority('ROLE_ENSEIGNANT')")
    @PostMapping("/save")
        ResponseEntity<ExamenDTO> saveExamen(@RequestBody ExamenDTO examen);

    // Etudiant: Soumettre sa participation
    @PreAuthorize("hasAuthority('ROLE_ETUDIANT')")
    @PostMapping("/submit")
    ResponseEntity<ParticipationExamenDTO> submitParticipation(@RequestBody ExamenSubmissionRequest request);

    // Enseignant: Noter une participation
    @PreAuthorize("hasAuthority('ROLE_ENSEIGNANT')")
    @PostMapping("/note")
    ResponseEntity<ParticipationExamenDTO> noteParticipation(@RequestBody ExamenNotationRequest request);

    // Etudiant: Télécharger l'examen (récupérer l'URL)
    @PreAuthorize("hasAnyAuthority('ROLE_ENSEIGNANT', 'ROLE_ETUDIANT')")
    @GetMapping("/{examenId}")
    ResponseEntity<ExamenResponseDTO> getExamenById(@PathVariable Long examenId);

    // Enseignant: Voir toutes les participations pour un examen
    @PreAuthorize("hasAnyAuthority('ROLE_ENSEIGNANT')")
    @GetMapping("/{examenId}/participations")
    ResponseEntity<List<ParticipationExamenDTO>> getParticipationsByExamenId(@PathVariable Long examenId);

    // Etudiant: Voir sa participation
    @PreAuthorize("hasAnyAuthority('ROLE_ETUDIANT')")
    @GetMapping("/{examenId}/participation")
    ResponseEntity<ParticipationExamenDTO> getParticipationByExamenAndStudent(@PathVariable Long examenId);
}