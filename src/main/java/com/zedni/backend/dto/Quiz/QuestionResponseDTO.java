package com.zedni.backend.dto.Quiz;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionResponseDTO {
    private Long id;
    private String enonce; // Corresponds to 'texte' in the model
    // L'attribut 'reponseCorrecte' est omis pour ne pas exposer la réponse au frontend
}