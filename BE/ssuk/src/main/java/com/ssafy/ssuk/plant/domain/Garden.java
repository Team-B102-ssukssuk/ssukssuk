package com.ssafy.ssuk.plant.domain;

import com.ssafy.ssuk.plant.dto.request.GardenRenameRequestDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.*;

@Entity
@Table(name = "garden")
@Getter
@NoArgsConstructor
@DynamicInsert
public class Garden {
    @Id @GeneratedValue
    @Column(name = "garden_id")
    private Integer id;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "plant_id")
    private Plant plant;

    // 이부분은 추후에 객체지향적으로 바꿀 예정
    // 바꿀때 복합키로 바꿀 예정
    ///////////////////////////////
//    @ManyToOne(fetch = LAZY)
//    @JoinColumn(name = "user_id")
//    private User user;
    @Column(name = "user_id")
    private Integer userId;
//    @ManyToOne(fetch = LAZY)
//    @JoinColumn(name = "pot_id")
//    private Pot pot;
    @Column(name = "pot_id")
    private Integer potId;
    ///////////////////////////////


    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
    @Column(name = "level")
    private Integer level;
    @Column(name = "plant_nickname")
    private String nickname;
    @Column(name = "is_use")
    private Boolean isUse;
    @Column(name = "first_date")
    private LocalDateTime firstDate;
    @Column(name = "second_date")
    private LocalDateTime secondDate;
    @Column(name = "third_date")
    private LocalDateTime thirdDate;


    public Garden(Integer userId, Plant plant, Integer potId, String nickname) {
        this.plant = plant;
        this.userId = userId;
        this.potId = potId;
        this.category = plant.getCategory();
        this.nickname = nickname;
    }

    // 비즈니스 로직
    public void unUseGarden() {
        this.isUse = false;
    }

    public void rename(String nickname) {
        this.nickname = nickname;
    }
}
