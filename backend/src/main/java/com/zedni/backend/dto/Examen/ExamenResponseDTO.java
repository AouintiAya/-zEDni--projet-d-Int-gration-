package com.zedni.backend.dto.Examen;

import com.zedni.backend.dto.Cours.CoursDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExamenResponseDTO {
    private Long id;
    private String titre;
    private String url;
    private Boolean corrige;
    private CoursDTO cours; // Assuming CoursDTO is a safe DTO
}
