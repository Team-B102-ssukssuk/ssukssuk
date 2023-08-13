package com.ssafy.ssuk.measurement.service;

import com.ssafy.ssuk.measurement.domain.Measurement;
import com.ssafy.ssuk.measurement.domain.SensorType;
import com.ssafy.ssuk.measurement.dto.request.UploadRequestDto;
import com.ssafy.ssuk.measurement.dto.response.MeasurementResponseDto;
import com.ssafy.ssuk.measurement.dto.socket.SensorMessageDto;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MeasurementService {
    //센서값 조회
    List<Measurement> findRecentValueByPot_Id(Integer user_id, Integer pot_id);

    void insertMeasurement(Measurement measurement);

    List<Measurement> findByPot_Id(Integer pot_id);

    void checkMeasurement(SensorMessageDto sensorMessageDto);

    Integer updateLevel(UploadRequestDto uploadRequestDto);

    List<MeasurementResponseDto> selectValueByPot_id(Integer potId, SensorType sensorType);
}
