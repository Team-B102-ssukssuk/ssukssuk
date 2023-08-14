package com.ssafy.ssuk.plant.repository.domain;

import com.ssafy.ssuk.plant.domain.Garden;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.Collection;
import java.util.List;

@Repository
@RequiredArgsConstructor
@Slf4j
public class GardenRepositoryImpl implements GardenRepository {

    private final EntityManager em;

    @Override
    public Garden findUsingByPotId(Integer potId) {
        List<Garden> gardens = em.createQuery("select g from Garden g where g.pot.id = :potId and g.isUse = true", Garden.class)
                .setParameter("potId", potId).getResultList();
        if (gardens.isEmpty()) {
            return null;
        } else {
            return gardens.get(0);
        }
    }

    @Override
    public void save(Garden garden) {
        em.persist(garden);
    }

    @Override
    public Garden findOneById(Integer id) {
        return em.find(Garden.class, id);
    }

    @Override
    public Garden findOneByIdAndUserId(Integer gardenId, Integer userId) {
        List<Garden> resultList = em.createQuery("select g from Garden g" +
                        " join fetch g.plant plant" +
                        " join fetch plant.category pc" +
                        " where g.id = :gardenId and g.user.id = :userId and g.isDeleted=false", Garden.class)
                .setParameter("gardenId", gardenId)
                .setParameter("userId", userId)
                .getResultList();
        if (resultList.isEmpty()) {
            return null;
        } else {
            return resultList.get(0);
        }
    }

    @Override
    public List<Garden> findAllByUserId(Integer userId, Boolean isUse) {
        return em.createQuery("select g from Garden g" +
                        " join fetch g.plant plant" +
                        " join fetch plant.category pc" +
                        " where g.user.id = :userId and g.isUse = :isUse", Garden.class)
                .setParameter("userId", userId)
                .setParameter("isUse", isUse)
                .getResultList();
    }

    @Override
    public List<Garden> findAllByUserId(Integer userId) {
        return em.createQuery("select g from Garden g" +
                        " join fetch g.plant plant" +
                        " join fetch plant.category pc" +
                        " where g.user.id = :userId and g.isDeleted = false", Garden.class)
                .setParameter("userId", userId)
                .getResultList();
    }

    @Override
    public List<Garden> findOnlyAllByUserId(int userId) {
        return em.createQuery("select g from Garden g" +
                        " where g.user.id = :userId and g.isDeleted = false", Garden.class)
                .setParameter("userId", userId)
                .getResultList();
    }

    @Override
    public void minusOrders(int userId, int orders) {
        em.createNativeQuery("update GARDEN" +
                        " set ORDERS = ORDERS - 1" +
                        " where USER_ID = :userId" +
                        " and ORDERS > :orders")
                .setParameter("userId", userId)
                .setParameter("orders", orders)
                .executeUpdate();
    }

    @Override     //지민
    public Garden findGardenByPotId(Integer potId) {
        List<Garden> resultList = em.createQuery("select g from Garden g " +
                        " join fetch g.plant" +
//                        " join fetch g.user" +
                        " where g.pot.id = :potId and g.isDeleted = false and g.isUse = true ", Garden.class)
                .setParameter("potId", potId).getResultList();
        if (resultList.isEmpty()) {
            return null;
        }
        return resultList.get(0);
    }

    @Override
    public void deleteFromPot(Integer userId, Integer potId) {
        em.createNativeQuery("update GARDEN" +
                        " set IS_USE = 0" +
                        " where USER_ID = :userId" +
                        " and POT_ID = :potId")
                .setParameter("userId", userId)
                .setParameter("potId", potId)
                .executeUpdate();
    }
}
