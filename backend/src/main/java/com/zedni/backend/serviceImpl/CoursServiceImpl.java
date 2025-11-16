package com.zedni.backend.serviceImpl;
import com.zedni.backend.dto.Cours.CoursDTO;
import com.zedni.backend.dto.Ressource.RessourceDTO;
import com.zedni.backend.model.Cours;
import com.zedni.backend.model.Enseignant;
import com.zedni.backend.model.Users;
import com.zedni.backend.repository.CoursRepo;
import com.zedni.backend.repository.EnseignantRepo;
import com.zedni.backend.repository.UserRepo;
import com.zedni.backend.service.CoursService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CoursServiceImpl implements CoursService {
    @Autowired
    private CoursRepo coursRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private EnseignantRepo enseignantRepo;

    @Autowired
    private FileStorageService fileStorageService;

    @Override
    public Cours createCours(String titre, String description, MultipartFile image, String email) throws IOException {
        // 1. Chercher le compte Users
        Users user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Chercher l'enseignant correspondant
        Enseignant enseignant = enseignantRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Enseignant non trouvé pour cet utilisateur"));

        Cours cours = new Cours();
        cours.setTitre(titre);
        cours.setDescription(description);

        // Upload image si fournie
        if (image != null && !image.isEmpty()) {
            String imageUrl = fileStorageService.store(image);
            cours.setImageUrl(imageUrl);
        }
        cours.setEnseignant(enseignant);

        // 4. Sauvegarder
        return coursRepo.save(cours);
    }

    @Transactional(readOnly = true)
    @Override
    public List<CoursDTO> getAllCours() {
        return coursRepo.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private CoursDTO convertToDTO(Cours cours) {
        List<RessourceDTO> ressourceDTOs = cours.getRessources() != null
                ? cours.getRessources().stream()
                .map(r -> new RessourceDTO(r.getId(), r.getTitre(), r.getType(),r.getUrl(),r.getCours().getId()))
                .collect(Collectors.toList())
                : new ArrayList<>();

        return new CoursDTO(
                cours.getId(),
                cours.getTitre(),
                cours.getDescription(),
                cours.getEnseignant() != null ? cours.getEnseignant().getEmail() : null,
                ressourceDTOs
        );
    }
    @Transactional(readOnly = true)
    @Override
    public CoursDTO getCoursByIdDTO(Long id) {
        Cours cours = coursRepo.findByIdWithRessources(id)
                .orElseThrow(() -> new RuntimeException("Cours not found"));
        return convertToDTO(cours);
    }

    @Override
    public void deleteCours(Long id) {
        Cours cours = coursRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Cours not found"));

        coursRepo.delete(cours);
    }

    @Override
    public Cours updateCours(Long id, String titre, String description, MultipartFile image, String email) throws IOException {
        Cours cours = coursRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Cours non trouvé"));


        // Vérifie que l'enseignant courant est bien le propriétaire
        Users user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Chercher l'enseignant correspondant
        Enseignant enseignant = enseignantRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Enseignant non trouvé pour cet utilisateur"));

        if (titre != null) cours.setTitre(titre);
        if (description != null) cours.setDescription(description);

        // Upload image si fournie
        if (image != null && !image.isEmpty()) {
            // Supprimer l'ancienne image si existante
            if (cours.getImageUrl() != null) {
                fileStorageService.delete(cours.getImageUrl());
            }
            String imageUrl = fileStorageService.store(image);
            cours.setImageUrl(imageUrl);
        }
        coursRepo.save(cours);
        System.out.println("Updating course ID: " + id);
        return cours;
    }
}
