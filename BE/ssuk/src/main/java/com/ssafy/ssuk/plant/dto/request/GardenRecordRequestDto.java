package com.ssafy.ssuk.plant.dto.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class GardenRecordRequestDto {
    @NotNull Integer gardenId;
    @NotNull Integer level;
    @NotNull String record;
}
