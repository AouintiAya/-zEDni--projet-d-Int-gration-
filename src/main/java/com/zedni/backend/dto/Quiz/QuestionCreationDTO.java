package com.zedni.backend.dto.Quiz;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionCreationDTO {
    private Long id;
    private String enonce;
    private String reponseCorrecte;
}

