package com.ssafy.ssuk.measurement.repository;

import com.ssafy.ssuk.measurement.domain.Measurement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeasurementRepository extends JpaRepository<Measurement, Integer> {
    //조회
    List<Measurement> findByPot_Id(Integer pot_id);

    //가장 최근 센서값 조회
    @Query(value = "select m from Measurement  m " +
            "where (m.sensorType, m.measurementTime) in" +
            "(select m.sensorType, max(m.measurementTime) as last_date from Measurement m " +
            "group by m.sensorType order by max(m.measurementTime)) and m.pot.id = :pot_id")
    List<Measurement> findRecentValueByPot_Id(@Param("pot_id") Integer pot_id);

    //물 급수
}
