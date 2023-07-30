package com.ssafy.ssuk.measurement.service;

import com.ssafy.ssuk.measurement.domain.Measurement;
import com.ssafy.ssuk.measurement.dto.request.SensorGetDto;
import com.ssafy.ssuk.measurement.repository.MeasurementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MesurementServiceImpl implements MesurementService {
    private final MeasurementRepository measurementRepository;

    @Autowired
    public MesurementServiceImpl(MeasurementRepository measurementRepository) {
        this.measurementRepository = measurementRepository;
    }

    @Override
    public List<Measurement> findByUser_IdAndPot_Id(Integer user_id, Integer pot_id) {
        // 해당 유저가 화분을 보유하고 있는지 체킹을 할까? 고려해보자

        //화분아이디로 센서값 뱉기
        return measurementRepository.findByPot_Id(pot_id);
    }
}
