package com.zedni.backend.service;

import com.zedni.backend.dto.Cours.ParticipantDTO;
import com.zedni.backend.dto.Cours.ParticipationCoursDto;

import java.security.Principal;
import java.util.List;

public interface ParticipationCoursService {

    void inscrireEtudiant(Long coursId, Principal principal);

    void desinscrireEtudiant(Long coursId, Principal principal);

    List<ParticipationCoursDto> getCoursInscrits(Principal principal);

    List<ParticipantDTO> getParticipantsByCours(Long coursId, Principal principal);
}
