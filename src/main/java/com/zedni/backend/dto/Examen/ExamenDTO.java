package com.zedni.backend.dto.Examen;

import com.zedni.backend.dto.Cours.CoursDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExamenDTO {
    private Long id;
    private String titre;
    private String url;
    private Long idCours;
    private String status;
}
