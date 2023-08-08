package com.ssafy.ssuk.notify.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class NotificationResponseDto {

    private Integer notificationId;

    private Integer userId;

    private Integer gardenId;

    private Integer potId;

    private String title;

    private String body;

    private Boolean visible;

    private LocalDateTime notification_date;

    public NotificationResponseDto(Integer notificationId, Integer userId, Integer gardenId, Integer potId, String title, String body, Boolean visible, LocalDateTime notification_date) {
        this.notificationId = notificationId;
        this.userId = userId;
        this.gardenId = gardenId;
        this.potId = potId;
        this.title = title;
        this.body = body;
        this.visible = visible;
        this.notification_date = notification_date;
    }
}
