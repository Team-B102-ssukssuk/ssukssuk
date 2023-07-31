package com.ssafy.ssuk.plant.dto.response;

import com.ssafy.ssuk.plant.domain.Garden;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
public class GardenSearchOneResponseDto {

    private Integer gardenId;
    private Integer potId;
    private Integer plantId;
    private String plantName;
    private Integer categoryId;
    private String categoryName;
    private String plantNickname;
    private Integer level;
    private LocalDateTime firstDate;
    private LocalDateTime secondDate;
    private LocalDateTime thirdDate;
    private Boolean isUse;

    public GardenSearchOneResponseDto(Garden garden) {
        this.gardenId = garden.getId();
        this.potId = garden.getPot().getId();
        this.plantId = garden.getPlant().getId();
        this.plantName = garden.getPlant().getName();
        this.categoryId = garden.getPlant().getCategory().getId();
        this.categoryName = garden.getPlant().getCategory().getName();
        this.plantNickname = garden.getNickname();
        this.level = garden.getLevel();
        this.firstDate = garden.getFirstDate();
        this.secondDate = garden.getSecondDate();
        this.thirdDate = garden.getThirdDate();
        this.isUse = garden.getIsUse();
    }
}
