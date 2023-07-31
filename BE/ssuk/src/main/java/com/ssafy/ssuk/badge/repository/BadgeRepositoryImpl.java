package com.ssafy.ssuk.badge.repository;

import com.ssafy.ssuk.badge.Badge;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class BadgeRepositoryImpl implements BadgeRepository {

    private final EntityManager em;

    @Override
    public void save(Badge badge) {
        em.persist(badge);
    }
}
