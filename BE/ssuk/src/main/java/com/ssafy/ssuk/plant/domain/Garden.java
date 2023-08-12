package com.ssafy.ssuk.plant.domain;

import com.ssafy.ssuk.pot.domain.Pot;
import com.ssafy.ssuk.user.domain.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.*;

@Entity
@Table(name = "GARDEN")
@Getter
@NoArgsConstructor
@DynamicInsert  // select 할 때 null이면 default 값 자동으로 들어감
public class Garden {
    @Id
    @GeneratedValue
    @Column(name = "GARDEN_ID")
    private Integer id;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "PLANT_ID")
    private Plant plant;

    // 이부분은 추후에 객체지향적으로 바꿀 예정
    // 바꿀때 복합키로 바꿀 예정 -> 못바꿈... 복합키는 GeneratedValue를 사용할 수 없음
    // 근데 그러면 왜 굳이 복합키를 쓰는거지? jpa에서 굳이 그럴필요가있나?
    // autoincrement가 있는 거는 대리키인거같음
    ///////////////////////////////
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;
    //////////////////
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "POT_ID")
    private Pot pot;

    @Column(name = "LEVEL")
    private Integer level;
    @Column(name = "PLANT_NICKNAME")
    private String nickname;
    @Column(name = "IS_USE")
    private Boolean isUse;
    @Column(name = "UNUSED_DATE")
    private LocalDateTime unusedDate;
    @Column(name = "FIRST_DATE")
    private LocalDateTime firstDate;
    @Column(name = "SECOND_DATE")
    private LocalDateTime secondDate;
    @Column(name = "THIRD_DATE")
    private LocalDateTime thirdDate;
    @Column(name = "IS_DELETED")
    private Boolean isDeleted;
    @Column(name = "ORDERS")
    private Integer orders;
    @Column(name = "FIRST_RECORD")
    private String firstRecord;
    @Column(name = "SECOND_RECORD")
    private String secondRecord;
    @Column(name = "THIRD_RECORD")
    private String thirdRecord;

    public Garden(User user, Plant plant, Pot pot, String nickname, Integer orders) {
        this.plant = plant;
        this.user = user;
        this.pot = pot;
        this.nickname = nickname;
        this.orders = orders;
    }

    // 비즈니스 로직
    public void unUsePot() {
        this.isUse = false;
        this.unusedDate = LocalDateTime.now();
    }

    public void rename(String nickname) {
        this.nickname = nickname;
    }

    public void removeFromGarden() {
        this.isUse = false;
        this.isDeleted = true;
        this.orders = 0;
    }

    public void updateLevel2(Integer level) {
        this.level = level;
        this.secondDate = LocalDateTime.now();
    }

    public void updateLevel3(Integer level) {
        this.level = level;
        this.thirdDate = LocalDateTime.now();
    }

    public void modifyOrders(Integer order) {
        this.orders = order;
    }

    public boolean modifyRecord(Integer level, String record) {
        if (this.level < level) {
            return false;
        }
        if (level == 1) {
            this.firstRecord = firstRecord;
        } else if (level == 2) {
            this.secondRecord = secondRecord;
        } else if (level == 3) {
            this.thirdRecord = thirdRecord;
        }
        return true;
    }
}
