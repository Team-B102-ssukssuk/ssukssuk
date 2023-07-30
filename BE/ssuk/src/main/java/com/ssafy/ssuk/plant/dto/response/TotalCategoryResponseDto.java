package com.ssafy.ssuk.plant.dto.response;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class TotalCategoryResponseDto {
    private Integer categoryId;
    private String categoryName;
    private List<TotalPlantResponseDto> plants = new ArrayList<>();

    public TotalCategoryResponseDto(Integer categoryId, String categoryName) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
    }
}


