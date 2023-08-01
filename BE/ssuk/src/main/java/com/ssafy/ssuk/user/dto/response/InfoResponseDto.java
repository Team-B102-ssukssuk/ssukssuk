package com.ssafy.ssuk.user.dto.response;

import com.ssafy.ssuk.badge.dto.response.UserBadgeResponseDto;
import lombok.Data;

import java.util.List;

@Data
public class InfoResponseDto {
    private String nickname;
    private Integer myPlantCount;
    private Integer gardenCount;
    private Integer collectionCount;
    private List<UserBadgeResponseDto> badges;
    public void addMyPlantCount() {
        this.myPlantCount++;
    }

    public void addGardenCount() {
        this.gardenCount++;
    }
}
