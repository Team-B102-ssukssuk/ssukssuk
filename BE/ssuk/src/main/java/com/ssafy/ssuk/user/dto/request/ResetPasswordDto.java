package com.ssafy.ssuk.user.dto.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ResetPasswordDto {

    @NotBlank
    private String email;

    @NotBlank
    private String password;
}
