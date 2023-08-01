package com.ssafy.ssuk.badge.domain;

import com.ssafy.ssuk.badge.domain.id.UserBadgeId;
import com.ssafy.ssuk.user.domain.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

import java.time.LocalDateTime;

import static javax.persistence.FetchType.*;

@Entity
@Getter
@Table(name = "USER_BADGE")
@IdClass(UserBadgeId.class)
@RequiredArgsConstructor
public class UserBadge {

    @Id
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;
    @Id
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "BADGE_ID")
    private Badge badge;
    @Column(name = "CREATED_DATE")
    private LocalDateTime createdDate;
}
