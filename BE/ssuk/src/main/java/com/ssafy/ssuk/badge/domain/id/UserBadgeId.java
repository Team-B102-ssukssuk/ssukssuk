package com.ssafy.ssuk.badge.domain.id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserBadgeId implements Serializable {
    private Integer user;
    private Integer badge;
}
