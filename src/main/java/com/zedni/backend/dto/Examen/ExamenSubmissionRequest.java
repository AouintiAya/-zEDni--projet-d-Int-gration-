package com.zedni.backend.dto.Examen;

import lombok.Data;

@Data
public class ExamenSubmissionRequest {
    private Long examenId;
    private String urlSoumission; // URL du fichier soumis par l'étudiant
}