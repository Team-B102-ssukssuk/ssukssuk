package com.ssafy.ssuk.plant.dto.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class GardenRegisterRequestDto {
    @NotNull
    private Integer plantId;
    @NotNull
    private Integer potId;
    @NotNull
    private Integer categoryId;
    @NotBlank
    private String nickname;
}
