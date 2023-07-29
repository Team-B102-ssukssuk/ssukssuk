package com.ssafy.ssuk.plant.category.repository;

import com.ssafy.ssuk.plant.category.PlantCategory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.Collection;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class PlantCategoryRepositoryImpl implements PlantCategoryRepository {

    private final EntityManager em;

    @Override
    public void save(PlantCategory plantCategory) {
        em.persist(plantCategory);
    }

    @Override
    public PlantCategory findOneById(Integer id) {
        return em.find(PlantCategory.class, id);
    }

    @Override
    public List<PlantCategory> findAll() {
        return em.createQuery("select pc from PlantCategory pc").getResultList();
    }

    @Override
    public List<PlantCategory> findAllByName(String name) {
        return em.createQuery("select pc from PlantCategory pc where pc.name = :name")
                .setParameter("name", name)
                .getResultList();
    }

    /**
     * 시간 나면 querydsl로 바꿔야 할듯
     */
    @Override
    public Collection<Object> findAllByNameExceptId(Integer id, String name) {
        return em.createQuery("select pc from PlantCategory pc where pc.name = :name and pc.id != :id")
                .setParameter("name", name)
                .setParameter("id", id)
                .getResultList();
    }
}
