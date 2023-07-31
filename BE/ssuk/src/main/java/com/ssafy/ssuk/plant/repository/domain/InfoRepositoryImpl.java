package com.ssafy.ssuk.plant.repository.domain;

import com.ssafy.ssuk.plant.domain.Info;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class InfoRepositoryImpl implements InfoRepository {

    private final EntityManager em;

    @Override
    public Info findOneById(Integer plantId, Integer level) {
        System.out.println("plantId = " + plantId);
        System.out.println("level = " + level);
        List<Info> resultList = em.createQuery("select pi from Info pi where pi.plant.id = :plantId and pi.level = :level", Info.class)
                .setParameter("plantId", plantId)
                .setParameter("level", level)
                .getResultList();
        if(resultList.isEmpty())
            return null;
        return resultList.get(0);
    }

    @Override
    public void save(Info info) {
        em.persist(info);
    }

    @Override
    public List<Info> findAll(Integer plantId) {
        return em.createQuery("select pi from Info pi where pi.plant.id=:plantId", Info.class)
                .setParameter("plantId", plantId).getResultList();
    }
}
