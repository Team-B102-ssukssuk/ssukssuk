package com.ssafy.ssuk.plant.category.dto;

import lombok.Data;

@Data
public class PlantCategoryRegisterResponseDto {
    private String message;

    public PlantCategoryRegisterResponseDto(String message) {
        this.message = message;
    }
}
