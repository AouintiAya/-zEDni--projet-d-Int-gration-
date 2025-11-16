package com.zedni.backend.dto.Examen;

import lombok.Data;

@Data
public class ExamenNotationRequest {
    private Long participationId;
    private Double note;
}
