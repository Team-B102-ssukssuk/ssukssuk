package com.ssafy.ssuk.badge.repository;

import com.ssafy.ssuk.badge.domain.Badge;
import com.ssafy.ssuk.badge.domain.UserBadge;

import java.util.List;

public interface BadgeRepository {
    void saveBadge(Badge badge);

    List<Badge> findAllByName(String badgeName);

    List<Badge> findAll();

    List<Badge> findAllByNameExceptThis(Integer badgeId, String badgeName);

    Badge findOneById(Integer badgeId);

    List<UserBadge> findAllWithUserId(Integer userId);

    UserBadge findUserBadgeByIdAndUserId(int badgeId, int userId);

    void saveUserBadge(int badgeId, int userId);
}
