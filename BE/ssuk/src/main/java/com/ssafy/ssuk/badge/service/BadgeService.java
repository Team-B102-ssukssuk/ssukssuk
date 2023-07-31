package com.ssafy.ssuk.badge.service;

import com.ssafy.ssuk.badge.dto.request.BadgeRegisterRequestDto;

public interface BadgeService {
    void saveBadge(BadgeRegisterRequestDto badgeRegisterRequestDto);
}
