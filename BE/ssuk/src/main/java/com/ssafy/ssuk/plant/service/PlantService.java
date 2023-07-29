package com.ssafy.ssuk.plant.service;

import com.ssafy.ssuk.plant.Plant;
import com.ssafy.ssuk.plant.category.PlantCategory;
import com.ssafy.ssuk.plant.dto.PlantRegisterRequestDto;

import java.util.List;

public interface PlantService {
    public void savePlant(PlantCategory category, PlantRegisterRequestDto plantRegisterRequestDto);

    public List<Plant> findPlants();
}
