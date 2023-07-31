package com.ssafy.ssuk.measurement.service;

import com.ssafy.ssuk.measurement.domain.Measurement;

import java.util.List;

public interface MeasurementService {
    //센서값 조회
    List<Measurement> findByUser_IdAndPot_Id(Integer user_id, Integer pot_id);

    void insertMeasurement(Measurement measurement);
}
