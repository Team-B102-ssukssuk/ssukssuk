package com.ssafy.ssuk.measurement.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GroundResponseDto {
    private String date;
    private Double max;
    private Double min;
    private Double avg;

    public GroundResponseDto(String date, Double max, Double min, Double avg) {
        this.date = date;
        this.max = max;
        this.min = min;
        this.avg = 100 - avg;
    }
}
