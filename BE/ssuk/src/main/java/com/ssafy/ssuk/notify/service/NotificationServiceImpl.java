package com.ssafy.ssuk.notify.service;

import com.ssafy.ssuk.notify.domain.Notification;
import com.ssafy.ssuk.notify.dto.response.NotificationResponseDto;
import com.ssafy.ssuk.notify.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public List<NotificationResponseDto> findNotification(Integer userId) {
        return notificationRepository.findByUser_Id(userId);
    }

    @Override
    public void updateNotification(Integer notificationId) {
        Optional<Notification> findNotification = notificationRepository.findById(notificationId);

        findNotification.ifPresent(noti -> {
            noti.setVisible(false);
            noti.setCheck_date(LocalDateTime.now());
            notificationRepository.save(noti);
        });
        //notificationRepository.updateNotification(notificationId);
    }
}
