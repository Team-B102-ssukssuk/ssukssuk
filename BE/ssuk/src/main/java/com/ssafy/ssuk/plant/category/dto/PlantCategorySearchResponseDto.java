package com.ssafy.ssuk.plant.category.dto;

import lombok.Data;

@Data
public class PlantCategorySearchResponseDto {
    Integer categoryId;
    String categoryName;

    public PlantCategorySearchResponseDto(Integer categoryId, String categoryName) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
    }
}
