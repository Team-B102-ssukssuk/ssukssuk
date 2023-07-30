package com.ssafy.ssuk.plant.dto.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class GardenRenameRequestDto {
    @NotNull
    private Integer gardenId;
    @NotBlank
    private String nickname;
}
