package com.ssafy.ssuk.exception.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

@Builder
@Data
@AllArgsConstructor
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
