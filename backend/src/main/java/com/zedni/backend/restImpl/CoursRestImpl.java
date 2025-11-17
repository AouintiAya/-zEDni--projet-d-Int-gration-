package com.zedni.backend.restImpl;

import com.zedni.backend.dto.Cours.CoursDTO;
import com.zedni.backend.model.Cours;
// import com.zedni.backend.model.UserPrincipal;
import com.zedni.backend.rest.CoursRest;
import com.zedni.backend.service.CoursService;
import com.zedni.backend.serviceImpl.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

@RestController
public class CoursRestImpl implements CoursRest {

    @Autowired
    private CoursService coursService;

    @Autowired
    private FileStorageService fileStorageService;

    @Override
    public ResponseEntity<Cours> createCours(String titre, String description, MultipartFile image, Principal principal) throws IOException {
        Cours cours = coursService.createCours(titre, description, image, principal.getName());
        return ResponseEntity.ok(cours);
    }

    @Override
    public ResponseEntity<List<CoursDTO>> getAllCours()  {
        List<CoursDTO> cours = coursService.getAllCours();
        return ResponseEntity.ok(cours);
    }

    @Override
    public ResponseEntity<CoursDTO> getCoursById(Long id) {
        CoursDTO coursDTO = coursService.getCoursByIdDTO(id);
        return ResponseEntity.ok(coursDTO);
    }

    @Override
    public ResponseEntity<String> deleteCours(Long id) {
        try {
            coursService.deleteCours(id);
            return ResponseEntity.ok("Cours supprimé avec succès !");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<Cours> updateCours(Long id, String titre, String description, MultipartFile image, Principal principal) throws IOException{
            Cours cours=coursService.updateCours(id,titre,description,image,principal.getName());
            return ResponseEntity.ok(cours);
    }
    @Override
    public ResponseEntity<List<CoursDTO>> getCoursOfEnseignant(Principal principal) {

        List<CoursDTO> cours = coursService.getCoursByEnseignantEmail(principal.getName());

        return ResponseEntity.ok(cours);
    }

}