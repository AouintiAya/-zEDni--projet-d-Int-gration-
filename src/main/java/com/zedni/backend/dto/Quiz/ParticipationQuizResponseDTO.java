package com.zedni.backend.dto.Quiz;

import com.zedni.backend.dto.Person.EtudiantDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParticipationQuizResponseDTO {
    private Long id;
    private EtudiantDTO student; // Assuming EtudiantDTO is a safe DTO
    private Double note;
    private Map<Long, String> reponses; // Map<QuestionId, ReponseChoisie>
    private Boolean corrige;
    private Long quizId; // Added for clarity
}
