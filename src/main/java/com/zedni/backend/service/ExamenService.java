package com.zedni.backend.service;

import com.zedni.backend.dto.Examen.*;
import com.zedni.backend.model.Examen;
import com.zedni.backend.model.ParticipationExamen;

import java.util.List;

public interface ExamenService {
    // Enseignant: Créer/Mettre à jour un examen (avec l'URL du PDF)
    ExamenDTO saveExamen(ExamenDTO examen);

    // Etudiant: Soumettre sa participation (avec l'URL de son travail)
    ParticipationExamenDTO submitParticipation(ExamenSubmissionRequest request, String studentEmail);

    // Enseignant: Noter une participation
    ParticipationExamenDTO noteParticipation(ExamenNotationRequest request);

    // Etudiant: Télécharger l'examen (récupérer l'URL)
    ExamenResponseDTO getExamenById(Long examenId);

    // Enseignant: Voir toutes les participations pour un examen
    List<ParticipationExamenDTO> getParticipationsByExamenId(Long examenId);

    // Etudiant: Voir sa participation
    ParticipationExamenDTO getParticipationByExamenAndStudent(Long examenId, String studentEmail);
}