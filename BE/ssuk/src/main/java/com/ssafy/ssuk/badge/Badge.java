package com.ssafy.ssuk.badge;

import com.ssafy.ssuk.badge.dto.request.BadgeRegisterRequestDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "BADGE")
@Getter
@NoArgsConstructor
public class Badge {
    @Id @GeneratedValue
    @Column(name = "BADGE_ID")
    private Integer id;
    @Column(name = "BADGE_NAME")
    private String badgeName;
    @Column(name = "CONDITION")
    private String condition;
    @Column(name = "DESCRIPTION")
    private String description;
    @Column(name = "IS_HIDDEN")
    private Boolean isHidden;
    @Column(name = "BADGE_IMAGE")
    private String badgeImage;

    public Badge(BadgeRegisterRequestDto badgeRegisterRequestDto) {
        this.badgeName = badgeRegisterRequestDto.getBadgeName();
        this.condition = badgeRegisterRequestDto.getCondition();
        this.description = badgeRegisterRequestDto.getDescription();
        this.isHidden = badgeRegisterRequestDto.getIsHidden();
        this.badgeImage = badgeRegisterRequestDto.getBadgeImage();
    }
}
