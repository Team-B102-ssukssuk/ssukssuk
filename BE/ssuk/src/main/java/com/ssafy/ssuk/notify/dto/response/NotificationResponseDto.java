package com.ssafy.ssuk.notify.dto.response;

import com.ssafy.ssuk.notify.domain.Notification;
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

    private String notification_date;

    private String ninckName;

    private Integer badgeId;

    public NotificationResponseDto(Notification n) {
        this.notificationId = n.getId();
        this.userId = n.getUser().getId();
        if(n.getGarden() != null) {
            this.ninckName = n.getGarden().getNickname();
            this.gardenId = n.getGarden().getId();
        }
        if(n.getPot() != null) {
            this.potId = n.getPot().getId();
        }
        this.title = n.getTitle();
        this.notificationType = n.getNotificationType();
        this.body = n.getBody();
        this.visible = n.getVisible();
        this.notification_date = String.valueOf(n.getNotification_date());
        if(n.getBadge() != null)
            this.badgeId = n.getBadge().getId();
    }
}
