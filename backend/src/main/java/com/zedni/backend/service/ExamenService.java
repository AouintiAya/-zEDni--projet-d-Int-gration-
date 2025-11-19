package com.zedni.backend.service;

import java.util.List;

import com.zedni.backend.dto.Examen.ExamenDTO;
import com.zedni.backend.dto.Examen.ExamenNotationRequest;
import com.zedni.backend.dto.Examen.ExamenResponseDTO;
import com.zedni.backend.dto.Examen.ExamenSubmissionRequest;
import com.zedni.backend.dto.Examen.ParticipationExamenDTO;

public interface ExamenService {
    // Enseignant: Créer/Mettre à jour un examen (avec l'URL du PDF)
    ExamenDTO saveExamen(ExamenDTO examen);

    // Etudiant: Soumettre sa participation (avec l'URL de son travail)
    ParticipationExamenDTO submitParticipation(ExamenSubmissionRequest request, String studentEmail);

    // Enseignant: Noter une participation
    ParticipationExamenDTO noteParticipation(ExamenNotationRequest request);

    List<ExamenDTO> getExamensByCoursId(Long coursId);

    // Etudiant: Télécharger l'examen (récupérer l'URL)
    ExamenResponseDTO getExamenById(Long examenId);

    // Enseignant: Voir toutes les participations pour un examen
    List<ParticipationExamenDTO> getParticipationsByExamenId(Long examenId);

    // Etudiant: Voir sa participation
    ParticipationExamenDTO getParticipationByExamenAndStudent(Long examenId, String studentEmail);
}