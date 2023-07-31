package com.ssafy.ssuk.badge.service;

import com.ssafy.ssuk.badge.Badge;
import com.ssafy.ssuk.badge.dto.request.BadgeRegisterRequestDto;
import com.ssafy.ssuk.badge.repository.BadgeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BadgeServiceImpl implements BadgeService {

    private final BadgeRepository badgeRepository;

    @Override
    @Transactional
    public void saveBadge(BadgeRegisterRequestDto badgeRegisterRequestDto) {
        Badge badge = new Badge(badgeRegisterRequestDto);
        badgeRepository.save(badge);
    }
}
