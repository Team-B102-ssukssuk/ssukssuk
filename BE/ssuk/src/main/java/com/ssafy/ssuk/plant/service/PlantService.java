package com.ssafy.ssuk.plant.service;

import com.ssafy.ssuk.plant.domain.Plant;
import com.ssafy.ssuk.plant.domain.Category;
import com.ssafy.ssuk.plant.dto.request.PlantRegisterRequestDto;
import com.ssafy.ssuk.plant.dto.request.PlantUpdateRequestDto;

import java.util.List;

public interface PlantService {
    public void savePlant(Category category, PlantRegisterRequestDto plantRegisterRequestDto);

    public List<Plant> findPlants();

    Plant findOneById(Integer id);

    void modifyPlant(PlantUpdateRequestDto plantUpdateRequestDto, Category category);
}
