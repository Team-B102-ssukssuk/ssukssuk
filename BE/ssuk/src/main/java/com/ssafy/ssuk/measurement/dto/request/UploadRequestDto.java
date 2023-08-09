package com.ssafy.ssuk.measurement.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UploadRequestDto {
    private Integer potId;
    private Integer level;
}
