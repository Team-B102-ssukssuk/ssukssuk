package com.ssafy.ssuk.measurement.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class MeasurementResponseDto {
    private String date;
    private Double max;
    private Double min;
    private Double avg;

    public MeasurementResponseDto(String date, Double max, Double min, Double avg) {
        this.date = date;
        this.max = max;
        this.min = min;
        this.avg = avg;
    }
}
