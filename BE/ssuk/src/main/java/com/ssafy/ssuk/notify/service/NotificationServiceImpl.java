package com.ssafy.ssuk.notify.service;

import com.ssafy.ssuk.badge.domain.Badge;
import com.ssafy.ssuk.badge.domain.BadgeCode;
import com.ssafy.ssuk.notify.domain.Notification;
import com.ssafy.ssuk.notify.domain.NotificationType;
import com.ssafy.ssuk.notify.dto.response.NotificationResponseDto;
import com.ssafy.ssuk.notify.repository.FcmRepository;
import com.ssafy.ssuk.notify.repository.NotificationRepository;
import com.ssafy.ssuk.user.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final FcmService fcmService;

    @Autowired
    public NotificationServiceImpl(NotificationRepository notificationRepository, FcmService fcmService) {
        this.notificationRepository = notificationRepository;
        this.fcmService = fcmService;
    }

    @Override
    public List<NotificationResponseDto> findNotification(Integer userId) {
        return notificationRepository.findByUser__Id(userId)
                .stream()
                .map(n -> new NotificationResponseDto(n))
                .collect(Collectors.toList());
//        return notificationRepository.findByUser_Id(userId);
    }

    @Override
    public void updateNotification(Integer notificationId) {
        Optional<Notification> findNotification = notificationRepository.findById(notificationId);

        findNotification.ifPresent(noti -> {
            noti.setVisible(false);
            noti.setCheck_date(LocalDateTime.now());
            notificationRepository.save(noti);
        });
    }

    @Override
    @Transactional
    public void pushAndInsertNotificationForBadge(Integer userId, BadgeCode badgeCode) {
        fcmService.sendPushTo(userId, badgeCode.name() + " 업적을 달성하였습니다.", "축하드려용");
        Notification notification = Notification.builder()
                .user(User.builder().id(userId).build())
                .notificationType(NotificationType.B)
                .title(badgeCode.name() + " 업적을 달성하였습니다.")
                .badge(new Badge(badgeCode.getCode()))
                .body("축하드려용")
                .build();
        notificationRepository.save(notification);
    }

    @Override
    public void deleteAllNotificationWithGardenId(Integer gardenId) {
        notificationRepository.updateAllNotificationWithGardenId(gardenId);
    }

    @Override
    public void deleteAllNotificationWithPotId(Integer potId) {
        notificationRepository.updateAllNotificationWithPotId(potId);
    }

    @Override
    @Transactional
    public void updateAllNotification(Integer userId) {
        notificationRepository.updateAllNotification(userId);
    }

}
