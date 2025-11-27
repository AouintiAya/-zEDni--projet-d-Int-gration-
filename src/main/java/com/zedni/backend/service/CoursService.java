package com.zedni.backend.service;
import com.zedni.backend.dto.Cours.CoursDTO;
import com.zedni.backend.model.Cours;
import com.zedni.backend.model.CoursStatus;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CoursService {
    CoursDTO createCours(String titre, String description, MultipartFile image, String email) throws IOException;
    List<CoursDTO> getAllCours();
    CoursDTO getCoursByIdDTO(Long id);
    void deleteCours(Long id);
    CoursDTO updateCours(Long id, String titre, String description, MultipartFile image, String email) throws IOException;
    public List<CoursDTO> getCoursByEnseignantEmail(String email);
    void updateCoursStatus(Long coursId, CoursStatus status);
    List<CoursDTO> getCoursEnAttente();
}
