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
}
