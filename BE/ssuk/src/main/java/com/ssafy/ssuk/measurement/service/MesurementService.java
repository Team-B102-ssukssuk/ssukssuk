package com.ssafy.ssuk.measurement.service;

import com.ssafy.ssuk.measurement.domain.Measurement;
import com.ssafy.ssuk.measurement.dto.request.SensorGetDto;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface MesurementService {
    //센서값 조회
    List<Measurement> findByUser_IdAndPot_Id(Integer user_id, Integer pot_id);
}
