package com.ssafy.ssuk.pot.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.ssuk.plant.domain.Garden;
import com.ssafy.ssuk.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "POT")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
@DynamicInsert
public class Pot {

    @Id
    @GeneratedValue
    @Column(name = "POT_ID")
    private Integer id;

    @ManyToOne(fetch = LAZY)
    @JsonIgnore
    @JoinColumn(name = "USER_ID")
    private User user;

    @Column(name = "SERIAL_NUMBER")
    private String serialNumber;

    @Column(name = "REGISTED_DATE")
    private LocalDateTime registedDate;

    @Column(name = "IS_REGISTED")
    private Boolean isRegisted;

    @OneToMany(mappedBy = "pot")
    private List<Garden> garden;

    @Column(name = "ORDERS")
    private Integer orders;

    @Column(name = "MOISTURE_LAST_DATE")
    private LocalDateTime moistureLastDate;

    @Column(name = "TANK_LAST_DATE")
    private LocalDateTime tankLastDate;

    public void updateMoistueLastDate(LocalDateTime moistureLastDate) {
        this.moistureLastDate = moistureLastDate;
    }

    public void updateTankLastDate(LocalDateTime tankLastDate) {
        this.tankLastDate = tankLastDate;
    }

    public Pot (Integer potId) {
        this.id = potId;
    }
}
