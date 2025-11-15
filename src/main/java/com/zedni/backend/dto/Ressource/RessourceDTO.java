package com.zedni.backend.dto.Ressource;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RessourceDTO {
    private Long id;
    private String titre;
    private String type;
    private String url;
    private Long coursId;


}
