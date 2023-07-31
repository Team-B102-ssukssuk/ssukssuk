package com.ssafy.ssuk.badge.dto.request;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class BadgeRegisterRequestDto {
    @NotBlank
    private String badgeName;
    @NotBlank
    private String condition;
    @NotBlank
    private String description;
    @NotNull
    private Boolean isHidden;
    @NotBlank
    private String badgeImage;
}
