package com.ssafy.ssuk.plant.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TotalInfoResponseDto {
    @JsonIgnore // 얘도 출력시키고 싶지 않아..
    private Integer plantId;
    private Integer level;
    private String plantGuide;
    private Integer waterTerm;
    private Integer waterAmount;
    private String characterName;
    private String characterComment;
    private LocalDateTime createdDate;

    public TotalInfoResponseDto(Integer plantId, Integer level, String plantGuide, Integer waterTerm, Integer waterAmount, String characterName, String characterComment) {
        this.plantId = plantId;
        this.level = level;
        this.plantGuide = plantGuide;
        this.waterTerm = waterTerm;
        this.waterAmount = waterAmount;
        this.characterName = characterName;
        this.characterComment = characterComment;
    }

    public TotalInfoResponseDto(Integer plantId, Integer level, String plantGuide, Integer waterTerm, Integer waterAmount, String characterName, String characterComment, LocalDateTime createdDate) {
        this.plantId = plantId;
        this.level = level;
        this.plantGuide = plantGuide;
        this.waterTerm = waterTerm;
        this.waterAmount = waterAmount;
        this.characterName = characterName;
        this.characterComment = characterComment;
        this.createdDate = createdDate;
    }
}
