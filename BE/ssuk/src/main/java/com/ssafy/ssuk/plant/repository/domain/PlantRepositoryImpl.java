package com.ssafy.ssuk.plant.repository.domain;

import com.ssafy.ssuk.plant.domain.Plant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class PlantRepositoryImpl implements PlantRepository{

    private final EntityManager em;

    @Override
    public void save(Plant newPlant) {
        em.persist(newPlant);
    }

    /**
     * 페이징 안되는 방식으로 구현함!!
     * 페이징이 불가능하지는 않지만 이렇게 구현할 경우
     * 일단 가져오고 메모리에서 페이징 하는데 데이터 값이 적으면 문제되지 않지만 많을 경우 대참사!!!
     * 여기서는 많지 않을거라 생각하고 이 방식을 썼음
     * 그리고 이 방식은 컬렉션 페치 조인은 1번만 가능, 2번 이상 쓸 경우 데이터가 부정합하게 조회될 수 있음
     * 아래도 동일
     */
    @Override
    public List<Plant> findAll() {
        return em.createQuery("select distinct p from Plant p" +
                " join fetch p.category pc", Plant.class).getResultList();
    }

    /**
     * 페이징 안되는 방식으로 구현함!!
     */
    @Override
    public Plant findOneById(Integer id) {
        List<Plant> result = em.createQuery("select distinct p from Plant p" +
                        " join fetch p.category pc" +
                        " where p.id = :id", Plant.class)
                .setParameter("id", id).getResultList();
        if(result.isEmpty())
            return null;
        return result.get(0);
    }
}
