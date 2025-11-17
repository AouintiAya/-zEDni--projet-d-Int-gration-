package com.zedni.backend.restImpl;

import com.zedni.backend.dto.Cours.ParticipantDTO;
import com.zedni.backend.dto.Cours.ParticipationCoursDto;
import com.zedni.backend.rest.ParticipationCoursRest;
import com.zedni.backend.service.ParticipationCoursService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ParticipationCoursRestImpl implements ParticipationCoursRest {

    private final ParticipationCoursService service;

    @Override
    public ResponseEntity<String> inscrire(Long id, Principal principal) {
        service.inscrireEtudiant(id, principal);
        return ResponseEntity.ok("Inscription réussie");
    }

    @Override
    public ResponseEntity<String> desinscrire(Long id, Principal principal) {
        service.desinscrireEtudiant(id, principal);
        return ResponseEntity.ok("Désinscription réussie");
    }

    @Override
    public ResponseEntity<List<ParticipationCoursDto>> mesCours(Principal principal) {
        return ResponseEntity.ok(service.getCoursInscrits(principal));
    }

    @Override
    public ResponseEntity<List<ParticipantDTO>> participants(Long id, Principal principal) {
        return ResponseEntity.ok(service.getParticipantsByCours(id, principal));
    }
}
