package com.zedni.backend.dto.Quiz;

import lombok.Data;
import java.util.Map;

@Data
public class QuizSubmissionRequest {
    private Long quizId;
    private Map<Long, String> reponses; // Map<QuestionId, ReponseEtudiant>
}