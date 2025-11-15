package com.zedni.backend.restImpl;

import com.zedni.backend.dto.Ressource.RessourceCreateRequest;
import com.zedni.backend.dto.Ressource.RessourceDTO;
import com.zedni.backend.rest.RessourceRest;
import com.zedni.backend.service.RessourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
public class RessourceRestImpl implements RessourceRest {

    @Autowired
    private RessourceService resService;

    @Override
    public ResponseEntity<RessourceDTO> upload(MultipartFile file, String titre, String type, Long coursId) throws Exception {
            RessourceDTO dto = resService.uploadFile(file, titre, type, coursId);
            return ResponseEntity.ok(dto);
    }

    @Override
    public ResponseEntity<RessourceDTO> createLink(RessourceCreateRequest req) {
        RessourceDTO dto = resService.createFromLink(req.getTitre(), req.getUrl(), req.getCoursId());
        return ResponseEntity.ok(dto);
    }

    @Override
    public ResponseEntity<List<RessourceDTO>> getByCours(Long coursId) {
        return ResponseEntity.ok(resService.getAllByCours(coursId));
    }

    @Override
    public ResponseEntity<RessourceDTO> getById(Long id) {
        return ResponseEntity.ok(resService.getById(id));
    }

    @Override
    public ResponseEntity<String> delete(Long id) throws Exception{
        resService.delete(id);
        return ResponseEntity.ok("Ressource supprimée");
    }
    private void validateType(String type) {
        if (!List.of("PDF", "VIDEO", "LINK").contains(type.toUpperCase()))
            throw new IllegalArgumentException("Type invalide");
    }

}
