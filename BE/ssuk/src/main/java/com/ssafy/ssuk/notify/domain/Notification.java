package com.ssafy.ssuk.notify.domain;

import com.ssafy.ssuk.badge.domain.Badge;
import com.ssafy.ssuk.badge.domain.BadgeCode;
import com.ssafy.ssuk.plant.domain.Garden;
import com.ssafy.ssuk.pot.domain.Pot;
import com.ssafy.ssuk.user.domain.User;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "NOTIFICATION")
@Getter
@NoArgsConstructor // 기본 생성자
@AllArgsConstructor // 모든 필드 값을 파라미터로 받는 생성자
@Setter
@Builder
@DynamicInsert
public class Notification {
    @Id @GeneratedValue
    @Column(name = "NOTIFICATION_ID")
    private Integer id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "GARDEN_ID")
    private Garden garden;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "POT_ID")
    private Pot pot;

    @Column(name = "TITLE")
    private String title;

    @Column(name = "NOTIFICATION_TYPE")
    @Enumerated(EnumType.STRING)
    private NotificationType notificationType;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "BADGE_ID")
    private Badge badge;

    @Column(name = "BODY")
    private String body;

    @Column(name = "VISIBLE")
    private Boolean visible;

    @Column(name = "NOTIFICATION_DATE")
    private LocalDateTime notification_date;

    @Column(name = "CHECK_DATE")
    private LocalDateTime check_date;

    @Column(name = "LEVEL")
    private Integer level;

}
