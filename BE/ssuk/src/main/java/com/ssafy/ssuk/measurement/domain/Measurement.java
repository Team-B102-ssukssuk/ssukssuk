package com.ssafy.ssuk.measurement.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.ssuk.pot.domain.Pot;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDate;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "MEASUREMENT")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@Setter
public class Measurement {
    @Id @GeneratedValue
    @Column(name = "MEASUREMENT_ID")
    private Integer id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "POT_ID")
    @JsonIgnore
    private Pot pot;

    @Column(name = "MEASUREMENT_VALUE")
    private Double measurementValue;

    @Column(name = "MEASUREMENT_TIME")
    private LocalDate measurementTime;

    @Column(name = "SENSOR_TYPE")
    @Enumerated(EnumType.STRING)
    private SensorType sensorType;
}
