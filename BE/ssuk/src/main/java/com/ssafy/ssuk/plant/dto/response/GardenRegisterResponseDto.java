package com.ssafy.ssuk.plant.dto.response;

import lombok.Data;

@Data
public class GardenRegisterResponseDto {
    private Integer gardenId;
    public GardenRegisterResponseDto(Integer id) {
        gardenId = id;
    }
}
