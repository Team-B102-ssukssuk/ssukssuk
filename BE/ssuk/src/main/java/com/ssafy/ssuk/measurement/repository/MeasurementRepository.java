package com.ssafy.ssuk.measurement.repository;

import com.ssafy.ssuk.measurement.domain.Measurement;
import com.ssafy.ssuk.measurement.domain.SensorType;
import com.ssafy.ssuk.measurement.dto.response.GroundResponseDto;
import com.ssafy.ssuk.measurement.dto.response.MeasurementResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

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

    // 온도
    @Query("select new com.ssafy.ssuk.measurement.dto.response.MeasurementResponseDto(date_format(m.measurementTime, '%m-%d'), max(m.measurementValue), min(m.measurementValue), avg(m.measurementValue) )" +
            " from Measurement m" +
            " where m.pot.id = :potId and m.sensorType = :sensorType " +
            " group by date_format(m.measurementTime, '%m-%d')")
    List<MeasurementResponseDto> selectValueByPot_id(@Param("potId") Integer potId, @Param("sensorType") SensorType sensorType);

    @Query("select new com.ssafy.ssuk.measurement.dto.response.GroundResponseDto(date_format(m.measurementTime, '%m-%d'), max(m.measurementValue), min(m.measurementValue), avg(m.measurementValue) )" +
            " from Measurement m" +
            " where m.pot.id = :potId and m.sensorType = :sensorType " +
            " group by date_format(m.measurementTime, '%m-%d')")
    List<GroundResponseDto> selectGroundByPot_id(@Param("potId") Integer potId, @Param("sensorType") SensorType sensorType);
}
