package com.zedni.backend.dto.Quiz;

import com.zedni.backend.dto.Cours.CoursDTO;
import com.zedni.backend.model.CoursStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizResponseDTO {
    private Long id;
    private String titre;
    private Long idCours; // Assuming CoursDTO is a safe DTO
    private List<QuestionCreationDTO> questions;
    private CoursStatus status;// New DTO for questions
}
