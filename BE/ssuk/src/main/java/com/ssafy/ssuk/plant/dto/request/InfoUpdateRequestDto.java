package com.ssafy.ssuk.plant.dto.request;

import lombok.Data;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class InfoUpdateRequestDto {
    @NotNull
    private Integer plantId;
    @NotNull
    @Range(min = 1, max = 3)
    private Integer level;
    @NotBlank
    private String plantGuide;
    @NotNull
    @Range(min = 1, max = 100)
    private Integer waterTerm;
    @NotNull
    @Range(min = 1, max = 1000)
    private Integer waterAmount;
    @NotBlank
    private String characterName;
    @NotBlank
    private String characterComment;
}
