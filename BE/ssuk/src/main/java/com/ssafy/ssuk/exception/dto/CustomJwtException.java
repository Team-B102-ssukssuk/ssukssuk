package com.ssafy.ssuk.exception.dto;

import lombok.Getter;

@Getter
public class CustomJwtException extends RuntimeException {
//    private final ErrorCode errorCode;
    public CustomJwtException(String message) {
        super(message);
    }
}