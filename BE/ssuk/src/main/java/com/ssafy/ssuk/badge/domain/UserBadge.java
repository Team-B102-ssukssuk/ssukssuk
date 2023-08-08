package com.ssafy.ssuk.badge.domain;

import com.ssafy.ssuk.badge.domain.id.UserBadgeId;
import com.ssafy.ssuk.user.domain.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

import java.time.LocalDateTime;

import static javax.persistence.FetchType.*;

@Entity
@Getter
@Table(name = "USER_BADGE")
@IdClass(UserBadgeId.class)
@DynamicInsert
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

    public UserBadge(Badge badge, User user) {
        this.user = user;
        this.badge = badge;
        this.createdDate = LocalDateTime.now();
    }
}
