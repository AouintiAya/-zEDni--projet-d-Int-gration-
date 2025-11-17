package com.zedni.backend.service;
import com.zedni.backend.dto.Cours.CoursDTO;
import com.zedni.backend.model.Cours;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CoursService {
    Cours createCours(String titre, String description, MultipartFile image, String email) throws IOException;
    List<CoursDTO> getAllCours();
    CoursDTO getCoursByIdDTO(Long id);
    void deleteCours(Long id);
    Cours updateCours(Long id, String titre, String description, MultipartFile image, String email) throws IOException;
    public List<CoursDTO> getCoursByEnseignantEmail(String email);
}
