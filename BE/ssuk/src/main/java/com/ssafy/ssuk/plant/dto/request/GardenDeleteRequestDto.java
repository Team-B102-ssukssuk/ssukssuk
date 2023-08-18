package com.ssafy.ssuk.plant.dto.request;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class GardenDeleteRequestDto {
    @NotNull
    private Integer gardenId;
}
