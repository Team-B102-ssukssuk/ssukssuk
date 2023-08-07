package com.ssafy.ssuk.notify.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.ssuk.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "FCM")
@Getter
@NoArgsConstructor // 기본 생성자
@AllArgsConstructor // 모든 필드 값을 파라미터로 받는 생성자
@Setter
public class Fcm {

    @Id @GeneratedValue
    @Column(name = "FCM_TOKEN_ID")
    private Integer id;

    @ManyToOne(fetch = LAZY)
    @JsonIgnore
    @JoinColumn(name = "USER_ID")
    private User user;

    @Column(name = "FCM_TOKEN")
    private String fcm_token;

}
