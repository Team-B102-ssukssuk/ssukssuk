package com.ssafy.ssuk.plant.dto;

import lombok.Data;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class PlantRegisterRequestDto {
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
