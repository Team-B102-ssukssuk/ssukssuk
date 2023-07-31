package com.ssafy.ssuk.measurement.mapper;

import com.ssafy.ssuk.measurement.domain.Measurement;
import com.ssafy.ssuk.measurement.dto.socket.SensorMessageDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MeasurementMapper {
    @Mapping(source = "potId", target = "pot.id")
    Measurement MessageDtoToMeasurement(SensorMessageDto sensorMessageDto);
}
