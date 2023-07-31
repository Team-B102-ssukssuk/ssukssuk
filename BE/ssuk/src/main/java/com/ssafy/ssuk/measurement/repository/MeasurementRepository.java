package com.ssafy.ssuk.measurement.repository;

import com.ssafy.ssuk.measurement.domain.Measurement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeasurementRepository extends JpaRepository<Measurement, Integer> {
    //조회
    List<Measurement> findByPot_Id(Integer pot_id);

    //물 급수
}
