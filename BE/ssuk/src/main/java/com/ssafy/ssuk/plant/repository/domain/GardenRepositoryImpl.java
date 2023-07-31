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
        if(gardens.isEmpty()){
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
                        " join fetch g.pot pot" +
                        " where g.id = :gardenId and g.userId = :userId and g.isUse = true", Garden.class)
                .setParameter("gardenId", gardenId)
                .setParameter("userId", userId)
                .getResultList();
        if(resultList.isEmpty()) {
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
                        " join fetch g.pot pot" +
                        " where g.userId = :userId and g.isUse = :isUse", Garden.class)
                .setParameter("userId", userId)
                .setParameter("isUse", isUse)
                .getResultList();
    }

    @Override
    public List<Garden> findAllByUserId(Integer userId) {
        return em.createQuery("select g from Garden g" +
                        " join fetch g.plant plant" +
                        " join fetch plant.category pc" +
                        " join fetch g.pot pot" +
                        " where g.userId = :userId", Garden.class)
                .setParameter("userId", userId)
                .getResultList();
    }
}
