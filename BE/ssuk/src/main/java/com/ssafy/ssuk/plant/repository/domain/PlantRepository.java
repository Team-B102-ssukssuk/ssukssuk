package com.ssafy.ssuk.plant.repository.domain;

import com.ssafy.ssuk.plant.domain.Plant;

import java.util.List;

public interface PlantRepository {
    public void save(Plant newPlant);
    public List<Plant> findAll();
    public Plant findOneById(Integer id);
}
