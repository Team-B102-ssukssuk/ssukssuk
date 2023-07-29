package com.ssafy.ssuk.pot.domain;

import com.ssafy.ssuk.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "POT")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class Pot {

    @Id @GeneratedValue
    @Column(name = "POT_ID")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @Column(name = "SERIAL_NUMBER")
    private String serialNumber;

    @Column(name = "REGISTED_DATE")
    private LocalDateTime registedDate;

    @Column(name = "LAST_WATER_TIME")
    private LocalDateTime lastWaterTime;

    @Column(name="IS_REGISTED")
    private Boolean isRegisted;
}
