package com.zedni.backend.rest;


import com.zedni.backend.dto.Ressource.RessourceCreateRequest;
import com.zedni.backend.dto.Ressource.RessourceDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequestMapping("api/ressource")
public interface RessourceRest {
    // Upload file (PDF/VIDEO) — form-data
    @PostMapping(value = "/upload", consumes = {"multipart/form-data"})
    @PreAuthorize("hasAuthority('ROLE_ENSEIGNANT')")// seulement enseignant
    public ResponseEntity<RessourceDTO> upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam("titre") String titre,
            @RequestParam("type") String type,
            @RequestParam("coursId") Long coursId
    )throws Exception ;

    // Create link resource
    @PostMapping("/link")
    @PreAuthorize("hasAuthority('ROLE_ENSEIGNANT')")
    public ResponseEntity<RessourceDTO> createLink(@RequestBody RessourceCreateRequest req);

    @GetMapping("/cours/{coursId}")
    public ResponseEntity<List<RessourceDTO>> getByCours(@PathVariable Long coursId);

    @GetMapping("/{id}")
    public ResponseEntity<RessourceDTO> getById(@PathVariable Long id);

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ENSEIGNANT')")
    public ResponseEntity<String> delete(@PathVariable Long id)throws Exception ;

}
