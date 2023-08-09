package com.ssafy.ssuk.notify.dto.response;

import com.ssafy.ssuk.notify.domain.NotificationType;
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

    private NotificationType notificationType;

    private String body;

    private Boolean visible;

    private LocalDateTime notification_date;

    private String ninckName;

    public NotificationResponseDto(Integer notificationId, Integer userId, Integer gardenId, Integer potId, String title, NotificationType notificationType, String body, Boolean visible, LocalDateTime notification_date, String ninckName) {
        this.notificationId = notificationId;
        this.userId = userId;
        this.gardenId = gardenId;
        this.potId = potId;
        this.title = title;
        this.notificationType = notificationType;
        this.body = body;
        this.visible = visible;
        this.notification_date = notification_date;
        this.ninckName = ninckName;
    }
}
