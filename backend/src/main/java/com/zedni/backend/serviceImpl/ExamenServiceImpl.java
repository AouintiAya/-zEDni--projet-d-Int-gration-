package com.zedni.backend.serviceImpl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zedni.backend.dto.Cours.CoursDTO;
import com.zedni.backend.dto.Examen.ExamenDTO;
import com.zedni.backend.dto.Examen.ExamenNotationRequest;
import com.zedni.backend.dto.Examen.ExamenResponseDTO;
import com.zedni.backend.dto.Examen.ExamenSubmissionRequest;
import com.zedni.backend.dto.Examen.ParticipationExamenDTO;
import com.zedni.backend.dto.Person.EtudiantDTO;
import com.zedni.backend.model.Cours;
import com.zedni.backend.model.Examen;
import com.zedni.backend.model.ParticipationExamen;
import com.zedni.backend.model.Users;
import com.zedni.backend.repository.CoursRepo;
import com.zedni.backend.repository.ExamenRepo;
import com.zedni.backend.repository.ParticipationExamenRepo;
import com.zedni.backend.repository.UserRepo;
import com.zedni.backend.service.ExamenService;

@Service
public class ExamenServiceImpl implements ExamenService {

    @Autowired
    private ExamenRepo examenRepo;

    @Autowired
    private ParticipationExamenRepo participationExamenRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private CoursRepo coursRepo;

    @Override
    public ExamenDTO saveExamen(ExamenDTO examenDTO) {
        Cours cours = coursRepo.findById(examenDTO.getIdCours())
                .orElseThrow(() -> new RuntimeException("Cours non trouvé"));

        // Convert DTO → Entity
        Examen examen = toExamenEntity(examenDTO, cours);

        // Save
        Examen saved = examenRepo.save(examen);

        // Return DTO
        return toExamenDTO(saved);
    }

    @Override
    public ParticipationExamenDTO submitParticipation(ExamenSubmissionRequest request, String studentEmail) {

        Optional<Examen> examenOpt = examenRepo.findById(request.getExamenId());
        Optional<Users> studentOpt = userRepo.findByEmail(studentEmail);

        if (examenOpt.isEmpty() || studentOpt.isEmpty()) {
            throw new RuntimeException("Examen ou étudiant non trouvé.");
        }

        Examen examen = examenOpt.get();
        Users student = studentOpt.get();

        // Vérifier si l'étudiant a déjà une participation
        Optional<ParticipationExamen> participationOpt =
                participationExamenRepo.findByExamenAndStudent(examen, student);

        ParticipationExamen participation = participationOpt.orElseGet(ParticipationExamen::new);

        participation.setExamen(examen);
        participation.setStudent(student);
        participation.setUrlSoumission(request.getUrlSoumission());

        ParticipationExamen saved = participationExamenRepo.save(participation);

        // 🔥 Retourner un DTO SÉCURISÉ
        return toParticipationDTO(saved);
    }


    @Override
    public ParticipationExamenDTO noteParticipation(ExamenNotationRequest request) {
        Optional<ParticipationExamen> participationOpt = participationExamenRepo.findById(request.getParticipationId());

        if (participationOpt.isEmpty()) {
            throw new RuntimeException("Participation non trouvée.");
        }

        ParticipationExamen participation = participationOpt.get();
        participation.setNote(request.getNote());
        participation.setCorrigé(true);

        ParticipationExamen saved = participationExamenRepo.save(participation);
        return toParticipationDTO(saved);
    }


    @Override
    public ExamenResponseDTO getExamenById(Long examenId) {
        Examen examen = examenRepo.findById(examenId).orElseThrow(() -> new RuntimeException("Examen non trouvé."));
        return toExamenResponseDTO(examen);
    }

    @Override
    public List<ParticipationExamenDTO> getParticipationsByExamenId(Long examenId) {
        Examen examen = examenRepo.findById(examenId).orElseThrow(() -> new RuntimeException("Examen non trouvé."));
        return participationExamenRepo.findByExamen(examen).stream()
                .map(this::toParticipationDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ParticipationExamenDTO getParticipationByExamenAndStudent(Long examenId, String studentEmail) {
        Examen examen = examenRepo.findById(examenId).orElseThrow(() -> new RuntimeException("Examen non trouvé."));
        Users student = userRepo.findByEmail(studentEmail).orElseThrow(() -> new RuntimeException("Étudiant non trouvé."));
        ParticipationExamen participation = participationExamenRepo.findByExamenAndStudent(examen, student).orElse(null);
        return participation != null ? toParticipationDTO(participation) : null;
    }

    private CoursDTO toCoursDTO(Cours cours) {
        if (cours == null) return null;
        CoursDTO dto = new CoursDTO();
        dto.setId(cours.getId());
        dto.setTitre(cours.getTitre());
        // Add other safe fields from Cours model if needed
        return dto;
    }
    private EtudiantDTO toStudentDTO(Users student) {
        EtudiantDTO dto = new EtudiantDTO();
        dto.setId(student.getId());
        dto.setEmail(student.getEmail());
        dto.setRole(student.getRole());
        return dto;
    }
    private ExamenResponseDTO toExamenResponseDTO(Examen examen) {
        if (examen == null) return null;
        ExamenResponseDTO dto = new ExamenResponseDTO();
        dto.setId(examen.getId());
        dto.setTitre(examen.getTitre());
        dto.setUrl(examen.getUrl());
        dto.setCorrige(examen.getCorrigé());
        dto.setCours(toCoursDTO(examen.getCours()));
        return dto;
    }

    private ParticipationExamenDTO toParticipationDTO(ParticipationExamen p) {
        ParticipationExamenDTO dto = new ParticipationExamenDTO();
        dto.setId(p.getId());
        dto.setStudent(toStudentDTO(p.getStudent()));
        dto.setNote(p.getNote());
        dto.setUrlSoumission(p.getUrlSoumission());
        dto.setCorrige(p.getCorrigé());

        if (p.getExamen() != null) {
            dto.setExamenId(p.getExamen().getId());
        }
        return dto;
    }
    private ExamenDTO toExamenDTO(Examen examen) {
        ExamenDTO dto = new ExamenDTO();
        dto.setId(examen.getId());
        dto.setTitre(examen.getTitre());
        dto.setUrl(examen.getUrl());
        dto.setIdCours(examen.getCours().getId());
        return dto;
    }

    private Examen toExamenEntity(ExamenDTO dto, Cours cours) {
        Examen examen = new Examen();
        examen.setId(dto.getId());
        examen.setTitre(dto.getTitre());
        examen.setUrl(dto.getUrl());
        examen.setCours(cours);
        return examen;
    }

@Override
public List<ExamenDTO> getExamensByCoursId(Long coursId) {
    List<Examen> examens = examenRepo.findByCoursId(coursId);
    return examens.stream()
            .map(this::toExamenDTO)
            .collect(Collectors.toList());
}

}