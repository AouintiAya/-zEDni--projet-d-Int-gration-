package com.zedni.backend.dto.Person;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnseignantDTO {
    private Long id ;
    private String nom;
    private String prenom;
    private String email;
    private boolean enabled;
}
