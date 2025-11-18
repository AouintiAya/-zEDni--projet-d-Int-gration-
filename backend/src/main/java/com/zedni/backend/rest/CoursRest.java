package com.zedni.backend.rest;


import com.zedni.backend.dto.Cours.CoursDTO;
import com.zedni.backend.model.Cours;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

@RequestMapping("/api/cours")
public interface CoursRest {

    @PreAuthorize("hasAuthority('ROLE_ENSEIGNANT')")
    @PostMapping(value = "/add", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    ResponseEntity<CoursDTO> createCours(
            @RequestParam("titre") String titre,
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile image,
            Principal principal
    ) throws IOException;
    @PreAuthorize("hasAnyAuthority('ROLE_ENSEIGNANT', 'ROLE_ETUDIANT')")
    @GetMapping("/all")
    public ResponseEntity<List<CoursDTO>> getAllCours();

    @PreAuthorize("hasAnyAuthority('ROLE_ENSEIGNANT', 'ROLE_ETUDIANT')")
    @GetMapping("/{id}")
    public ResponseEntity<CoursDTO> getCoursById(@PathVariable Long id);


    @PreAuthorize("hasAuthority('ROLE_ENSEIGNANT')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCours(@PathVariable Long id);

    @PutMapping("/{id}/update")
    @PreAuthorize("hasAuthority('ROLE_ENSEIGNANT')")
    ResponseEntity<CoursDTO> updateCours(
            @PathVariable Long id,
            @RequestParam(value = "titre", required = false) String titre,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "image", required = false) MultipartFile image,
            Principal principal) throws IOException;

    @PreAuthorize("hasAuthority('ROLE_ENSEIGNANT')")
    @GetMapping("/enseignant/my-cours")
    ResponseEntity<List<CoursDTO>> getCoursOfEnseignant(Principal principal);

}