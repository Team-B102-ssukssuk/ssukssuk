package com.ssafy.ssuk.collection.repository;

import com.ssafy.ssuk.collection.domain.Collection;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class CollectionRepositoryImpl implements CollectionRepository{

    private final EntityManager em;

    @Override
    public List<Collection> findAllByUserId(Integer userId) {
        return em.createQuery("select c from Collection c where c.id.userId = :userId")
                .setParameter("userId", userId)
                .getResultList();
    }

    @Override
    public Collection findOneByUserIdAndPlantIdAndLevel(Integer userId, Integer plantId, int level) {
        List<Collection> resultList = em.createQuery("select c from Collection c where c.id.userId = :userId and c.id.plantId = :plantId and c.id.level=:level", Collection.class)
                .setParameter("userId", userId)
                .setParameter("plantId", plantId)
                .setParameter("level", level)
                .getResultList();
        if (resultList.isEmpty()) {
            return null;
        } else {
            return resultList.get(0);
        }
    }

    @Override
    public void save(Collection collection) {
        em.persist(collection);
    }
}
