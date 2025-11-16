package com.zedni.backend.dto.Cours;

import com.zedni.backend.dto.Ressource.RessourceDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoursDTO {
    private Long id;
    private String titre;
    private String description;
    private String enseignantEmail;
    private List<RessourceDTO> ressources;
}
