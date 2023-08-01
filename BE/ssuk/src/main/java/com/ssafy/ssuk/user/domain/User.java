package com.ssafy.ssuk.user.domain;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "USER")
@Getter
//@NoArgsConstructor // 기본 생성자
@AllArgsConstructor // 모든 필드 값을 파라미터로 받는 생성자
@Setter
public class User implements UserDetails {

    @Id @GeneratedValue
    @Column(name = "USER_ID")
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

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public User() {
    }

    public User(String email, String password, String nickname) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
    }
}
