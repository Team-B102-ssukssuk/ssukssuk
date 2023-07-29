package com.ssafy.ssuk.pot.dto.requset;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PotInsertDto {
    private Integer userId;
    private String serialNumber;
}
