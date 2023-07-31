package com.ssafy.ssuk.exception.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.ResponseEntity;

@Builder
@Data
public class ErrorResponseEntity {
    private int status;
    private String code;
    private String message;

    public static ResponseEntity<ErrorResponseEntity> toResponseEntity(ErrorCode e) {
        return ResponseEntity.status(e.getHttpStatus()).body(ErrorResponseEntity.builder()
                .status(e.getHttpStatus().value()).code(e.name()).message(e.getMessage()).build());
    }
}
