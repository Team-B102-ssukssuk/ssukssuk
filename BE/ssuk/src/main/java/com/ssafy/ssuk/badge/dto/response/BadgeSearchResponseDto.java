package com.ssafy.ssuk.badge.dto.response;

import com.ssafy.ssuk.badge.domain.Badge;
import lombok.Data;

@Data
public class BadgeSearchResponseDto {
    private Integer badgeId;
    private String badgeName;
    private String condition;
    private String description;
    private String badgeImage;
    private Boolean isHidden;

    public BadgeSearchResponseDto(Badge badge) {
        this.badgeId = badge.getId();
        this.badgeName = badge.getBadgeName();
        this.condition = badge.getCondition();
        this.description = badge.getDescription();
        this.badgeImage = badge.getBadgeImage();
        this.isHidden = badge.getIsHidden();
    }
}
