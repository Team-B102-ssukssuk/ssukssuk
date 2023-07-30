package com.ssafy.ssuk.measurement.dto.socket;

import com.ssafy.ssuk.measurement.domain.SensorType;
import com.ssafy.ssuk.pot.domain.Pot;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SensorMessageDto {
    private Integer potId;
    private String serialNumber;
    private Double measurementValue;
    private SensorType sensorType;
    //private String msg;
}
