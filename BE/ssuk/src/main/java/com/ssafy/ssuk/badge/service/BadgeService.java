package com.ssafy.ssuk.badge.service;

import com.ssafy.ssuk.badge.dto.request.BadgeRegisterRequestDto;
import com.ssafy.ssuk.badge.dto.request.BadgeUpdateRequestDto;
import com.ssafy.ssuk.badge.dto.response.BadgeSearchResponseDto;

import java.util.List;

public interface BadgeService {
    void saveBadge(BadgeRegisterRequestDto badgeRegisterRequestDto);

    boolean isDuplicated(String badgeName);

    List<BadgeSearchResponseDto> findAll();

    boolean isDuplicatedExceptThis(Integer badgeId, String badgeName);

    void modifyBadge(BadgeUpdateRequestDto badgeUpdateRequestDto);
}
