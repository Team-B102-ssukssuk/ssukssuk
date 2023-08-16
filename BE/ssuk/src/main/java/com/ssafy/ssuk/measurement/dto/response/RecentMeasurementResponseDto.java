package com.ssafy.ssuk.measurement.dto.response;

import com.ssafy.ssuk.measurement.domain.SensorType;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class RecentMeasurementResponseDto {
    private Integer id;
    private Double measurementValue;
    private LocalDate measurementTime;
    private SensorType sensorType;

    public RecentMeasurementResponseDto(Integer id, Double measurementValue, LocalDate measurementTime, SensorType sensorType) {
        this.id = id;
        if (sensorType.equals(SensorType.M))
            this.measurementValue = 100 - measurementValue;
        else
            this.measurementValue = measurementValue;
        this.measurementTime = measurementTime;
        this.sensorType = sensorType;
    }
}
