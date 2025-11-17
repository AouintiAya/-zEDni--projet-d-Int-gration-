package com.zedni.backend.serviceImpl;

import com.zedni.backend.dto.Cours.ParticipantDTO;
import com.zedni.backend.dto.Cours.ParticipationCoursDto;
import com.zedni.backend.model.Cours;
import com.zedni.backend.model.Etudiant;
import com.zedni.backend.model.ParticipationCours;
import com.zedni.backend.repository.CoursRepo;
import com.zedni.backend.repository.EtudiantRepo;
import com.zedni.backend.repository.ParticipationCoursRepo;
import com.zedni.backend.service.ParticipationCoursService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ParticipationCoursServiceImpl implements ParticipationCoursService {

    private final ParticipationCoursRepo participationRepo;
    private final EtudiantRepo etudiantRepo;
    private final CoursRepo coursRepo;

    @Override
    public void inscrireEtudiant(Long coursId, Principal principal) {

        Etudiant etudiant = etudiantRepo.findByUserEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("Étudiant introuvable"));

        Cours cours = coursRepo.findById(coursId)
                .orElseThrow(() -> new RuntimeException("Cours introuvable"));

        if (participationRepo.existsByEtudiantIdAndCoursId(etudiant.getId(), coursId)) {
            throw new RuntimeException("Déjà inscrit dans ce cours");
        }

        ParticipationCours p = new ParticipationCours();
        p.setEtudiant(etudiant);
        p.setCours(cours);

        participationRepo.save(p);
    }

    @Transactional
    @Override
    public void desinscrireEtudiant(Long coursId, Principal principal) {

        Etudiant etudiant = etudiantRepo.findByUserEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("Étudiant introuvable"));

        participationRepo.deleteByEtudiantIdAndCoursId(etudiant.getId(), coursId);
    }

    @Override
    public List<ParticipationCoursDto> getCoursInscrits(Principal principal) {

        Etudiant etudiant = etudiantRepo.findByUserEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("Étudiant introuvable"));

        return participationRepo.findByEtudiantId(etudiant.getId()).stream()
                .map(p -> {
                    ParticipationCoursDto dto = new ParticipationCoursDto();
                    dto.setId(p.getId());
                    dto.setCoursId(p.getCours().getId());
                    dto.setTitreCours(p.getCours().getTitre());
                    dto.setDateInscription(p.getDateInscription());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<ParticipantDTO> getParticipantsByCours(Long coursId, Principal principal) {

        Cours cours = coursRepo.findById(coursId)
                .orElseThrow(() -> new RuntimeException("Cours introuvable"));

        // Vérifier si l'enseignant est propriétaire du cours
        if (!cours.getEnseignant().getUser().getEmail().equals(principal.getName())) {
            throw new RuntimeException("Vous n’êtes pas l’enseignant de ce cours");
        }

        return participationRepo.findByCoursId(coursId).stream()
                .map(p -> {
                    ParticipantDTO dto = new ParticipantDTO();
                    dto.setEtudiantId(p.getEtudiant().getId());
                    dto.setNom(p.getEtudiant().getNom());
                    dto.setPrenom(p.getEtudiant().getPrenom());
                    dto.setEmail(p.getEtudiant().getEmail());
                    dto.setDateInscription(p.getDateInscription());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}

