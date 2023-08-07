package com.ssafy.ssuk.badge.repository;

import com.ssafy.ssuk.badge.domain.Badge;
import com.ssafy.ssuk.badge.domain.UserBadge;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
@Slf4j
public class BadgeRepositoryImpl implements BadgeRepository {

    private final EntityManager em;

    @Override
    public void save(Badge badge) {
        em.persist(badge);
    }

    @Override
    public Badge findOneById(Integer badgeId) {
        return em.find(Badge.class, badgeId);
    }

    @Override
    public List<UserBadge> findAllWithUserId(Integer userId) {
        return em.createQuery("select ub from UserBadge ub" +
                        " join fetch ub.user u" +
                        " where u.id=:userId", UserBadge.class)
                .setParameter("userId", userId)
                .getResultList();
    }

    @Override
    public List<Badge> findAll() {
        return em.createQuery("select b from Badge b", Badge.class).getResultList();
    }

    @Override
    public List<Badge> findAllByName(String badgeName) {
        return em.createQuery("select b from Badge b where b.badgeName = :badgeName", Badge.class)
                .setParameter("badgeName", badgeName)
                .getResultList();
    }

    @Override
    public List<Badge> findAllByNameExceptThis(Integer badgeId, String badgeName) {
        return em.createQuery("select b from Badge b where b.badgeName = :badgeName and b.id != :badgeId", Badge.class)
                .setParameter("badgeName", badgeName)
                .setParameter("badgeId", badgeId)
                .getResultList();
    }
}
