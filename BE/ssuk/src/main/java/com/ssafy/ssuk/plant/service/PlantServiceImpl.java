package com.ssafy.ssuk.plant.service;

import com.ssafy.ssuk.plant.Plant;
import com.ssafy.ssuk.plant.category.PlantCategory;
import com.ssafy.ssuk.plant.category.repository.PlantCategoryRepository;
import com.ssafy.ssuk.plant.dto.PlantRegisterRequestDto;
import com.ssafy.ssuk.plant.repository.PlantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PlantServiceImpl implements PlantService{

    private final PlantCategoryRepository plantCategoryRepository;
    private final PlantRepository plantRepository;

    @Override
    @Transactional
    public void savePlant(PlantCategory category, PlantRegisterRequestDto plantRegisterRequestDto) {

        Plant newPlant = new Plant(category,
                plantRegisterRequestDto.getPlantName(),
                plantRegisterRequestDto.getTempMax(),
                plantRegisterRequestDto.getTempMin(),
                plantRegisterRequestDto.getMoistureMax(),
                plantRegisterRequestDto.getMoistureMin());

        plantRepository.save(newPlant);
    }

    @Override
    public List<Plant> findPlants() {
        return null;
    }
}
