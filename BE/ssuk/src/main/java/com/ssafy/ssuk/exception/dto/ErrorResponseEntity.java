package com.ssafy.ssuk.exception.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.ResponseEntity;

@Builder
@Data
public class ErrorResponseEntity {
    private int statusCode;
    private String statusName;
    private String message;

    public static ResponseEntity<ErrorResponseEntity> toResponseEntity(ErrorCode e) {
        return ResponseEntity
                .status(e.getHttpStatus())
                .body(ErrorResponseEntity.builder()
                        .statusCode(e.getHttpStatus().value())
                        .statusName(e.name())
                        .message(e.getMessage())
                        .build());
    }
}
