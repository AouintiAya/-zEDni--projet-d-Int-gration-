package com.zedni.backend.dto.Examen;

import com.zedni.backend.dto.Person.EtudiantDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParticipationExamenDTO {
    private Long id;
    private EtudiantDTO student;
    private Double note;
    private String urlSoumission;
    private boolean corrige;
    private Long examenId;
}
