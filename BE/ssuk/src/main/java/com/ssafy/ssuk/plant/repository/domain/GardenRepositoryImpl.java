package com.ssafy.ssuk.plant.repository.domain;

import com.ssafy.ssuk.plant.domain.Garden;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class GardenRepositoryImpl implements GardenRepository {

    private final EntityManager em;

    @Override
    public Garden findUsingByPotId(Integer potId) {
        List<Garden> gardens = em.createQuery("select g from Garden g where g.potId = :potId and g.isUse = true", Garden.class)
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
}
