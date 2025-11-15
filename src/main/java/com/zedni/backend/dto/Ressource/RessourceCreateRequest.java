package com.zedni.backend.dto.Ressource;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RessourceCreateRequest {
    private String titre;
    private String type; // "PDF" | "VIDEO" | "LINK"
    private String url;  // utilisé si type == "LINK"
    private Long coursId;
}
