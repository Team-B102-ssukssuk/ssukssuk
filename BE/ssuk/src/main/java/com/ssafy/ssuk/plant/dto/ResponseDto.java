package com.ssafy.ssuk.plant.dto;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class ResponseDto {
    String message;

    Map<String, Object> data = new HashMap<>();

    public ResponseDto(String message) {
        this.message = message;
    }
}
