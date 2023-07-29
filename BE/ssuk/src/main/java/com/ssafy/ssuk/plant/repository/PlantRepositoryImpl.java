package com.ssafy.ssuk.plant.repository;

import com.ssafy.ssuk.plant.Plant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class PlantRepositoryImpl implements PlantRepository{

    private final EntityManager em;

    @Override
    public void save(Plant newPlant) {
        em.persist(newPlant);
    }
}
