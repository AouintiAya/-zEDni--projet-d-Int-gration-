package com.zedni.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor
public class Personne {

    private String nom;
    private String prenom;
    private String email;
    private boolean enable=false;


}
