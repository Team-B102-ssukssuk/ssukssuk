package com.ssafy.ssuk.user.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "USER")
@Getter
@NoArgsConstructor // 기본 생성자
@AllArgsConstructor // 모든 필드 값을 파라미터로 받는 생성자
@Setter
public class User {

    @Id @GeneratedValue
    private Integer id;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "USER_NICKNAME")
    private String nickname;

    @Column(name = "PROFILE_IMAGE")
    private String profileImage = "default";

    @Column(name = "CREATED_DATE")
    private LocalDateTime createdTime = LocalDateTime.now();

    @Column(name = "UPDATED_DATE")
    private LocalDateTime updatedTime = LocalDateTime.now();

    @Column(name = "IS_VALIDATED")
    private Boolean isValidated = true;

    @Column(name = "PLANT_COUNT")
    private Integer plantCount = 0;
 //
}
