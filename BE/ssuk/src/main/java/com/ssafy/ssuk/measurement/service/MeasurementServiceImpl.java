package com.ssafy.ssuk.measurement.service;

import com.ssafy.ssuk.measurement.domain.Measurement;
import com.ssafy.ssuk.measurement.repository.MeasurementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MeasurementServiceImpl implements MeasurementService {
    private final MeasurementRepository measurementRepository;

    @Autowired
    public MeasurementServiceImpl(MeasurementRepository measurementRepository) {
        this.measurementRepository = measurementRepository;
    }

    @Override
    public List<Measurement> findRecentValueByPot_Id(Integer user_id, Integer pot_id) {
        // 해당 유저가 화분을 보유하고 있는지 체킹을 할까? 고려해보자

        //화분아이디로 센서값 뱉기
        return measurementRepository.findRecentValueByPot_Id(pot_id);
    }

    //시리얼 넘버 뱉기


    @Override
    public List<Measurement> findByPot_Id(Integer pot_id) {
        return measurementRepository.findByPot_Id(pot_id);
    }

    //센서값 저장
    @Override
    public void insertMeasurement(Measurement measurement) {
        measurementRepository.save(measurement);
    }
}
