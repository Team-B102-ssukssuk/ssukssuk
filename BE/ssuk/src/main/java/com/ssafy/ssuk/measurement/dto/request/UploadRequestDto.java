package com.ssafy.ssuk.measurement.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UploadRequestDto {
    @NotNull
    private Integer potId;
    @NotNull
    private Integer level;
}
