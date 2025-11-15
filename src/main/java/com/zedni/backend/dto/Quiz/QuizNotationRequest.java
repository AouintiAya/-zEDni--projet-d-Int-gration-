package com.zedni.backend.dto.Quiz;

import lombok.Data;

@Data
public class QuizNotationRequest {
    private Long participationId;
    private Double note;
}
