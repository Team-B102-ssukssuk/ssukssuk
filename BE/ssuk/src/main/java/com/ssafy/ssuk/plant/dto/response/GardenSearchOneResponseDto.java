package com.ssafy.ssuk.plant.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.ssuk.plant.domain.Garden;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
public class GardenSearchOneResponseDto {

    @JsonIgnore
    private final static String IMAGE_URL = "https://ssook.s3.ap-northeast-2.amazonaws.com/plant/";

    private Integer gardenId;
    private Integer potId;
    private Integer plantId;
    private String plantName;
    private Integer categoryId;
    private String categoryName;
    private String plantNickname;
    private Integer level;
    private String firstDate;
    private String secondDate;
    private String thirdDate;
    private Boolean isUse;
    private String unusedDate;
    private String firstRecord;
    private String secondRecord;
    private String thirdRecord;
    private String firstImage;
    private String secondImage;
    private String thirdImage;

    public GardenSearchOneResponseDto(Garden garden) {
        this.gardenId = garden.getId();
        this.potId = garden.getPot().getId();
        this.plantId = garden.getPlant().getId();
        this.plantName = garden.getPlant().getName();
        this.categoryId = garden.getPlant().getCategory().getId();
        this.categoryName = garden.getPlant().getCategory().getName();
        this.plantNickname = garden.getNickname();
        this.level = garden.getLevel();
        if (garden.getFirstDate() != null) {
            this.firstDate = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(garden.getFirstDate());
        }
        if (garden.getSecondDate() != null) {
            this.secondDate = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(garden.getSecondDate());
        }
        if (garden.getThirdDate() != null) {
            this.thirdDate = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(garden.getThirdDate());
        }
        if (garden.getUnusedDate() != null) {
            this.unusedDate = DateTimeFormatter.ofPattern("yyyy-MM-dd").format(garden.getUnusedDate());
        }
        this.isUse = garden.getIsUse();
        this.firstRecord = garden.getFirstRecord();
        this.secondRecord = garden.getSecondRecord();
        this.thirdRecord = garden.getThirdRecord();
        if (garden.getFirstImage() != null) {
            this.firstImage = IMAGE_URL + garden.getFirstImage();
        }
        if (garden.getSecondImage() != null) {
            this.secondImage = IMAGE_URL + garden.getSecondImage();
        }
        if (garden.getThirdImage() != null) {
            this.thirdImage = IMAGE_URL + garden.getThirdImage();
        }
    }
}
