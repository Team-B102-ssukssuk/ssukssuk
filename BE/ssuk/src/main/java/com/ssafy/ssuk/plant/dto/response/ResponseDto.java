package com.ssafy.ssuk.plant.dto.response;

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

    public ResponseDto(String message, String dataName, Object data) {
        this.message = message;
        this.data.put(dataName, data);
    }
}
