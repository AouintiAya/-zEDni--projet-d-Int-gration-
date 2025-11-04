package com.zedni.backend.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String password;
    private String role;

    private String nom;
    private String prenom;
    private String email;



    // Enseignant fields
    private String code;
}

