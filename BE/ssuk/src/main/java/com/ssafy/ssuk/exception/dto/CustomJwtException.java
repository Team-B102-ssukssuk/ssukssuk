package com.ssafy.ssuk.exception.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@AllArgsConstructor
public class CustomJwtException extends RuntimeException {
    ErrorCode errorCode;
//    public CustomJwtException(String message) {
//        super(message);
//    }
}