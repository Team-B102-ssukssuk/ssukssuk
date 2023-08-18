package com.ssafy.ssuk.notify.dto;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Builder
public class PushRequestDto {
    private String title;
    private String body;
}
