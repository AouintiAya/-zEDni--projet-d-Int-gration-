package com.zedni.backend.dto.Cours;

import com.zedni.backend.dto.Examen.ExamenDTO;
import com.zedni.backend.dto.Quiz.QuizResponseDTO;
import com.zedni.backend.dto.Ressource.RessourceDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoursAdminDto {
    private Long id;
    private String titre;
    private String description;
    private String enseignantEmail;
    private String imageUrl;
    private String status; //validé - en attende - rejectée
    private List<RessourceDTO> ressources;
    private List<ExamenDTO> examens;
    private List<QuizResponseDTO> quizzes;

}
