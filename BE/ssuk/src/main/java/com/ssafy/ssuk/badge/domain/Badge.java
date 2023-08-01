package com.ssafy.ssuk.badge.domain;

import com.ssafy.ssuk.badge.dto.request.BadgeRegisterRequestDto;
import com.ssafy.ssuk.badge.dto.request.BadgeUpdateRequestDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Table(name = "BADGE")
@Getter
@DynamicInsert
@NoArgsConstructor
public class Badge {
    @Id @GeneratedValue
    @Column(name = "BADGE_ID")
    private Integer id;
    @Column(name = "BADGE_NAME")
    private String badgeName;
    @Column(name = "BADGE_CONDITION")
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

    @Override
    public String toString() {
        return "Badge{" +
                "id=" + id +
                ", badgeName='" + badgeName + '\'' +
                ", condition='" + condition + '\'' +
                ", description='" + description + '\'' +
                ", isHidden=" + isHidden +
                ", badgeImage='" + badgeImage + '\'' +
                '}';
    }

    public void modify(BadgeUpdateRequestDto badgeUpdateRequestDto) {
        this.badgeName = badgeUpdateRequestDto.getBadgeName();
        this.condition = badgeUpdateRequestDto.getCondition();
        this.description = badgeUpdateRequestDto.getDescription();
        this.isHidden = badgeUpdateRequestDto.getIsHidden();
        this.badgeImage = badgeUpdateRequestDto.getBadgeImage();
    }
}
