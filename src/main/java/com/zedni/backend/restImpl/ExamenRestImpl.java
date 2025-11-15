package com.zedni.backend.restImpl;

import com.zedni.backend.dto.Examen.*;
import com.zedni.backend.model.Examen;
import com.zedni.backend.rest.ExamenRest;
import com.zedni.backend.service.ExamenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ExamenRestImpl implements ExamenRest {

    @Autowired
    private ExamenService examenService;

    private String getAuthenticatedUserEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @Override
    public ResponseEntity<ExamenDTO> saveExamen(ExamenDTO examen) {
        try {
            ExamenDTO savedExamen = examenService.saveExamen(examen);
            // NOTE: saveExamen retourne le modèle JPA, ce qui est acceptable pour la création/mise à jour
            // car le modèle est souvent renvoyé tel quel, mais il faudrait idéalement le convertir en DTO.
            // Pour l'instant, je le laisse tel quel car il n'y a pas de DTO de requête pour la création.
            return new ResponseEntity<>(savedExamen, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<ParticipationExamenDTO> submitParticipation(ExamenSubmissionRequest request) {
        try {
            ParticipationExamenDTO dto = examenService.submitParticipation(request, getAuthenticatedUserEmail());
            return new ResponseEntity<>(dto, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<ParticipationExamenDTO> noteParticipation(ExamenNotationRequest request) {
        try {
            ParticipationExamenDTO participation = examenService.noteParticipation(request);
            return new ResponseEntity<>(participation, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<ExamenResponseDTO> getExamenById(Long examenId) {
        try {
            ExamenResponseDTO examen = examenService.getExamenById(examenId);
            return new ResponseEntity<>(examen, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<ParticipationExamenDTO>> getParticipationsByExamenId(Long examenId) {
        try {
            List<ParticipationExamenDTO> participations = examenService.getParticipationsByExamenId(examenId);
            return new ResponseEntity<>(participations, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<ParticipationExamenDTO> getParticipationByExamenAndStudent(Long examenId) {
        try {
            ParticipationExamenDTO participation = examenService.getParticipationByExamenAndStudent(examenId, getAuthenticatedUserEmail());
            if (participation == null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(participation, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
