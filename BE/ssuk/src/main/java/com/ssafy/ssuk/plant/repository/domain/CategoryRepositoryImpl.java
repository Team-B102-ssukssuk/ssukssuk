package com.ssafy.ssuk.plant.repository.domain;

import com.ssafy.ssuk.exception.dto.CustomException;
import com.ssafy.ssuk.exception.dto.ErrorCode;
import com.ssafy.ssuk.plant.domain.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class CategoryRepositoryImpl implements CategoryRepository {

    private final EntityManager em;

    @Override
    public void save(Category plantCategory) {
        em.persist(plantCategory);
    }

    @Override
    public Category findOneById(Integer id) {
        return em.find(Category.class, id);
    }

    @Override
    public List<Category> findAll() {
        return em.createQuery("select distinct pc from Category pc join fetch pc.plants", Category.class).getResultList();
    }

    @Override
    public List<Category> findAllByName(String name) {
        return em.createQuery("select pc from Category pc where pc.name = :name", Category.class)
                .setParameter("name", name)
                .getResultList();
    }

    /**
     * 시간 나면 querydsl로 바꿔야 할듯
     */
    @Override
    public List<Category> findAllByNameExceptId(Integer id, String name) {
        return em.createQuery("select pc from Category pc where pc.name = :name and pc.id != :id", Category.class)
                .setParameter("name", name)
                .setParameter("id", id)
                .getResultList();
    }
}
