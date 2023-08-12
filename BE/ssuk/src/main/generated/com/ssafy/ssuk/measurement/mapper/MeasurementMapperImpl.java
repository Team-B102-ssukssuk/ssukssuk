package com.ssafy.ssuk.measurement.mapper;

import com.ssafy.ssuk.measurement.domain.Measurement;
import com.ssafy.ssuk.measurement.dto.socket.SensorMessageDto;
import com.ssafy.ssuk.pot.domain.Pot;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-08-11T20:35:26+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 1.8.0_192 (Azul Systems, Inc.)"
)
@Component
public class MeasurementMapperImpl implements MeasurementMapper {

    @Override
    public Measurement MessageDtoToMeasurement(SensorMessageDto sensorMessageDto) {
        if ( sensorMessageDto == null ) {
            return null;
        }

        Measurement measurement = new Measurement();

        measurement.setPot( sensorMessageDtoToPot( sensorMessageDto ) );
        measurement.setMeasurementValue( sensorMessageDto.getMeasurementValue() );
        measurement.setSensorType( sensorMessageDto.getSensorType() );

        return measurement;
    }

    protected Pot sensorMessageDtoToPot(SensorMessageDto sensorMessageDto) {
        if ( sensorMessageDto == null ) {
            return null;
        }

        Pot pot = new Pot();

        pot.setId( sensorMessageDto.getPotId() );

        return pot;
    }
}
