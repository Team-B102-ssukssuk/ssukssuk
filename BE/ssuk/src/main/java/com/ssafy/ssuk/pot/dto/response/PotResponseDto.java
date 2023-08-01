package com.ssafy.ssuk.pot.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class PotResponseDto {
    private Integer potId;
    private Integer userId;
    private LocalDateTime registedDate;
    private Integer level;
    private String nickname;
    private Boolean isUse;
    private Integer plantId;

    public PotResponseDto(Integer potId, Integer userId, LocalDateTime registedDate, Integer level, String nickname, Boolean isUse, Integer plantId) {
        this.potId = potId;
        this.userId = userId;
        this.registedDate = registedDate;
        this.level = level;
        this.nickname = nickname;
        this.plantId = plantId;

        if (isUse == null)
            this.isUse = false;
        else
            this.isUse = isUse;
    }
}
