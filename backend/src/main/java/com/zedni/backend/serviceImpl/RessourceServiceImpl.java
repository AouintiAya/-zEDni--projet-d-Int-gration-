package com.zedni.backend.serviceImpl;
import com.zedni.backend.dto.Ressource.RessourceDTO;
import com.zedni.backend.model.Cours;
import com.zedni.backend.model.Ressource;
import com.zedni.backend.repository.CoursRepo;
import com.zedni.backend.repository.RessourceRepo;
import com.zedni.backend.service.RessourceService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RessourceServiceImpl implements RessourceService {

    @Autowired
    private RessourceRepo resRepo;

    @Autowired
    private FileStorageService storageService;

    @Autowired
    private CoursRepo coursRepo;

    @Override
    @Transactional
    public RessourceDTO createFromLink(String titre, String url, Long coursId) {
        Cours cours = coursRepo.findById(coursId)
                .orElseThrow(() -> new RuntimeException("Cours not found"));
        Ressource r = new Ressource();
        r.setTitre(titre);
        r.setType("LINK");
        r.setUrl(url);
        r.setCours(cours);
        Ressource saved = resRepo.save(r);
        return toDTO(saved);
    }

    @Override
    @Transactional
    public RessourceDTO uploadFile(MultipartFile file, String titre, String type, Long coursId) throws Exception {
        String contentType = file.getContentType();

        // Vérification du type MIME selon le type déclaré
        if ("PDF".equalsIgnoreCase(type)) {
            if (!"application/pdf".equalsIgnoreCase(contentType)) {
                throw new IllegalArgumentException("Le fichier doit être un PDF !");
            }
        } else if ("VIDEO".equalsIgnoreCase(type)) {
            if (contentType == null ||
                    (!contentType.startsWith("video/") && !contentType.equals("application/mp4"))) {
                throw new IllegalArgumentException("Le fichier doit être une vidéo !");
            }
        } else {
            throw new IllegalArgumentException("Type non supporté : " + type);
        }

        Cours cours = coursRepo.findById(coursId)
                .orElseThrow(() -> new RuntimeException("Cours non trouvé"));

        String storedPath = storageService.store(file);

        Ressource r = new Ressource();
        r.setTitre(titre);
        r.setType(type.toUpperCase());
        r.setUrl(storedPath);
        r.setCours(cours);

        Ressource saved = resRepo.save(r);
        return toDTO(saved);
    }



    @Override
    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public List<RessourceDTO> getAllByCours(Long coursId) {
        return resRepo.findByCoursId(coursId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public RessourceDTO getById(Long id) {
        return resRepo.findById(id).map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Ressource not found"));
    }

    @Override
    @Transactional
    public void delete(Long id) throws Exception {
        Ressource r = resRepo.findById(id).orElseThrow(() -> new RuntimeException("Ressource not found"));
        // si c'est un fichier stocké, supprime le fichier aussi
        if ("PDF".equalsIgnoreCase(r.getType()) || "VIDEO".equalsIgnoreCase(r.getType())) {
            storageService.delete(r.getUrl());
        }
        resRepo.delete(r);
    }

    private RessourceDTO toDTO(Ressource r) {
        RessourceDTO dto = new RessourceDTO();
        dto.setId(r.getId());
        dto.setTitre(r.getTitre());
        dto.setType(r.getType());
        dto.setUrl(r.getUrl());
        dto.setCoursId(r.getCours() != null ? r.getCours().getId() : null);
        return dto;
    }
}
