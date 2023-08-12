package com.ssafy.ssuk.notify.service;

import com.ssafy.ssuk.notify.domain.Notification;
import com.ssafy.ssuk.notify.dto.response.NotificationResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface NotificationService {

    List<NotificationResponseDto> findNotification(Integer userId);

    void updateNotification(Integer notificationId);

    void updateAllNotification(Integer userId);
}
