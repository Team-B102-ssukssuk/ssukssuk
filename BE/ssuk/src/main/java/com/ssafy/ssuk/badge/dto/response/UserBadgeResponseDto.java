package com.ssafy.ssuk.badge.dto.response;

import com.ssafy.ssuk.badge.domain.Badge;
import com.ssafy.ssuk.badge.domain.UserBadge;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class UserBadgeResponseDto {
    private Integer badgeId;
    private String badgeName;
    private String condition;
    private String description;
    private String badgeImage;
    private Boolean isHidden;
    private Boolean isDone;
    private LocalDateTime createdDate;

    public UserBadgeResponseDto(List<Badge> badges, List<UserBadge> userBadges) {

        Badge badge = badges.get(0);
        this.badgeId = badge.getId();
        this.badgeName = badge.getBadgeName();
        this.condition = badge.getCondition();
        this.description = badge.getDescription();
        this.badgeImage = badge.getBadgeImage();
        this.isHidden = badge.getIsHidden();
        if(userBadges == null) {
            this.isDone = false;
        } else {
            this.isDone = true;
            this.createdDate = userBadges.get(0).getCreatedDate();
        }
    }
}
