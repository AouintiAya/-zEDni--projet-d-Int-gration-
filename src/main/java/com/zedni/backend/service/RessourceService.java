package com.zedni.backend.service;

import com.zedni.backend.dto.Ressource.RessourceDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface RessourceService {
    RessourceDTO createFromLink(String titre, String url, Long coursId);
    RessourceDTO uploadFile(MultipartFile file, String titre, String type, Long coursId) throws Exception;
    List<RessourceDTO> getAllByCours(Long coursId);
    RessourceDTO getById(Long id);
    void delete(Long id) throws Exception;
}
