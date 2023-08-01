package com.ssafy.ssuk.badge.service;

import com.ssafy.ssuk.badge.domain.Badge;
import com.ssafy.ssuk.badge.domain.UserBadge;
import com.ssafy.ssuk.badge.dto.request.BadgeRegisterRequestDto;
import com.ssafy.ssuk.badge.dto.request.BadgeUpdateRequestDto;
import com.ssafy.ssuk.badge.dto.response.BadgeSearchResponseDto;
import com.ssafy.ssuk.badge.dto.response.UserBadgeResponseDto;
import com.ssafy.ssuk.badge.repository.BadgeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class BadgeServiceImpl implements BadgeService {

    private final BadgeRepository badgeRepository;

    @Override
    @Transactional
    public void saveBadge(BadgeRegisterRequestDto badgeRegisterRequestDto) {
        Badge badge = new Badge(badgeRegisterRequestDto);
        log.info("badge={}", badge);
        badgeRepository.save(badge);
    }

    @Override
    public List<BadgeSearchResponseDto> findAll() {
        return badgeRepository.findAll()
                .stream()
                .map(b -> new BadgeSearchResponseDto(b))
                .collect(Collectors.toList());
    }

    @Override
    public boolean isDuplicated(String badgeName) {
        if(badgeRepository.findAllByName(badgeName).isEmpty()) {
            return false;
        } else {
            return true;
        }
    }

    @Override
    public boolean isDuplicatedExceptThis(Integer badgeId, String badgeName) {
        if(badgeRepository.findAllByNameExceptThis(badgeId, badgeName).isEmpty()) {
            return false;
        } else {
            return true;
        }
    }

    @Override
    @Transactional
    public void modifyBadge(BadgeUpdateRequestDto badgeUpdateRequestDto) {
        Integer badgeId = badgeUpdateRequestDto.getBadgeId();
        Badge badge = badgeRepository.findOneById(badgeId);
        if(badge == null) {
            // 에러던지자
            log.debug("없는 업적");
            return;
        }
        badge.modify(badgeUpdateRequestDto);
    }

    @Override
    public List<UserBadgeResponseDto> findAllWithUserId(Integer userId) {

        Map<Integer, List<Badge>> badgeMap = badgeRepository.findAll().stream().collect(Collectors.groupingBy(b -> b.getId()));
        Map<Integer, List<UserBadge>> userBadgeMap = badgeRepository.findAllWithUserId(userId).stream().collect(Collectors.groupingBy(ub -> ub.getBadge().getId()));

        return badgeMap.keySet()
                .stream()
                .map(key -> new UserBadgeResponseDto(badgeMap.get(key), userBadgeMap.get(key)))
                .collect(Collectors.toList());
    }
}
