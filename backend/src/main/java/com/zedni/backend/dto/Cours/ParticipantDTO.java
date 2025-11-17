package com.zedni.backend.dto.Cours;


import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ParticipantDTO {
    private Long etudiantId;
    private String nom;
    private String prenom;
    private String email;
    private LocalDateTime dateInscription;
}
