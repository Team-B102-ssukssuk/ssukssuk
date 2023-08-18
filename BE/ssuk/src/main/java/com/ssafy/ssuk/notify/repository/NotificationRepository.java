package com.ssafy.ssuk.notify.repository;

import com.ssafy.ssuk.notify.domain.Notification;
import com.ssafy.ssuk.notify.dto.response.NotificationResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    // 조회 (visible 1인거만)
//    @Query(value = " select new com.ssafy.ssuk.notify.dto.response.NotificationResponseDto(n.id, n.user.id, n.garden.id, n.pot.id, n.title, n.notificationType, n.body, n.visible, n.notification_date, n.garden.nickname, n.badge.id) from Notification n" +
//            " join fetch n.garden " +
//            " where n.user.id = :userId and n.visible = true " +
//            " order by n.notification_date desc")
//    List<NotificationResponseDto> findByUser_Id(@Param("userId") Integer userId);

    @Query("select n from Notification n left join fetch n.garden where n.user.id = :userId and n.visible = true order by n.notification_date desc")
    List<Notification> findByUser__Id(@Param("userId") Integer userId);

    // 알림 확인 (visible 0으로 갱신)
    @Query("update Notification n set n.visible = 0, n.check_date=now() where n.id = :notificationId and n.user.id = :userId")
    void updateNotification(@Param("notificationId") Integer notificationId);

    @Query("update Notification n set n.visible = 0, n.check_date=now() where n.user.id = :userId")
    @Modifying
    void updateAllNotification(@Param("userId") Integer userId);

    @Modifying
    @Query("update Notification n set n.visible = 0, n.check_date=now() where n.garden.id = :gardenId")
    void updateAllNotificationWithGardenId(@Param("gardenId") Integer gardenId);

    @Modifying
    @Query("update Notification n set n.visible = 0, n.check_date=now() where n.pot.id = :potId")
    void updateAllNotificationWithPotId(@Param("potId") Integer potId);
}
