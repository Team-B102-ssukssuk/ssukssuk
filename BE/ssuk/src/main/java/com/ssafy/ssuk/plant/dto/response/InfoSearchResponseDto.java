package com.ssafy.ssuk.plant.dto.Response;

import com.ssafy.ssuk.plant.domain.Info;
import lombok.Data;

@Data
public class InfoSearchResponseDto {
    private Integer level;
    private String guide;
    private Integer waterTerm;
    private Integer waterAmount;
    private String characterName;
    private String characterComment;
    private String characterImage;

    public InfoSearchResponseDto(Info info) {
        this.level = info.getLevel();
        this.guide = info.getGuide();
        this.waterTerm = info.getWaterTerm();
        this.waterAmount = info.getWaterAmount();
        this.characterName = info.getCharacterName();
        this.characterComment = info.getCharacterComment();
        this.characterImage = info.getCharacterImage();
    }
}
