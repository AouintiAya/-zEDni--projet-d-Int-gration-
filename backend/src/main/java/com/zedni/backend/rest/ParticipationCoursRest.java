package com.zedni.backend.rest;

import com.zedni.backend.dto.Cours.ParticipantDTO;
import com.zedni.backend.dto.Cours.ParticipationCoursDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RequestMapping("/api/participation")
public interface ParticipationCoursRest {

    @PostMapping("/cours/{id}/inscrire")
    ResponseEntity<String> inscrire(@PathVariable Long id, Principal principal);

    @DeleteMapping("/cours/{id}/desinscrire")
    ResponseEntity<String> desinscrire(@PathVariable Long id, Principal principal);

    @GetMapping("/etudiant/mes-cours")
    ResponseEntity<List<ParticipationCoursDto>> mesCours(Principal principal);

    @GetMapping("/cours/{id}/participants")
    ResponseEntity<List<ParticipantDTO>> participants(@PathVariable Long id, Principal principal);
}

