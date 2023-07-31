package com.ssafy.ssuk.plant.dto.response;

import lombok.Data;

@Data
public class CategorySearchResponseDto {
    Integer categoryId;
    String categoryName;

    public CategorySearchResponseDto(Integer categoryId, String categoryName) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
    }
}
