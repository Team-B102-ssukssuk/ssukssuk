package com.ssafy.ssuk.plant.category.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class PlantCategoryUpdateRequestDto {
    @NotNull
    private Integer categoryId;

    @NotBlank
    private String updateName;
}
