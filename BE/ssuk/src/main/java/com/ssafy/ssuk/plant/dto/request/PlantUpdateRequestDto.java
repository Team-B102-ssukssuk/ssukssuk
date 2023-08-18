package com.ssafy.ssuk.plant.dto.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class PlantUpdateRequestDto {
    @NotNull
    private Integer plantId;
    @NotNull
    private Integer categoryId;
    @NotBlank
    private String plantName;
    @NotNull
    private Float tempMax;
    @NotNull
    private Float tempMin;
    @NotNull
    private Float moistureMax;
    @NotNull
    private Float moistureMin;
}
