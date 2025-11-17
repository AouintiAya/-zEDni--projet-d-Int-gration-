package com.zedni.backend.dto.Cours;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParticipationCoursDto {
    private Long id;
    private Long coursId;
    private String titreCours;
    private LocalDateTime dateInscription;
}
