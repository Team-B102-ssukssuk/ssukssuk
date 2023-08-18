package com.ssafy.ssuk.user.dto.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class CheckPasswordDto {
    @NotBlank
    private String password;
}
