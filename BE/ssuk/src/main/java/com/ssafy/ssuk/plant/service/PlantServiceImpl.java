package com.ssafy.ssuk.plant.service;

import com.ssafy.ssuk.exception.dto.CustomException;
import com.ssafy.ssuk.exception.dto.ErrorCode;
import com.ssafy.ssuk.plant.domain.Plant;
import com.ssafy.ssuk.plant.domain.Category;
import com.ssafy.ssuk.plant.dto.request.PlantRegisterRequestDto;
import com.ssafy.ssuk.plant.dto.request.PlantUpdateRequestDto;
import com.ssafy.ssuk.plant.repository.domain.PlantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PlantServiceImpl implements PlantService{

    private final PlantRepository plantRepository;

    @Override
    @Transactional
    public void savePlant(Category category, PlantRegisterRequestDto plantRegisterRequestDto) {

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
        return plantRepository.findAll();
    }

    @Override
    public Plant findOneById(Integer id) {
        return Optional.ofNullable(plantRepository.findOneById(id)).orElseThrow(() -> new CustomException(ErrorCode.PLANT_NOT_FOUND));
    }


    @Override
    @Transactional
    public void modifyPlant(PlantUpdateRequestDto plantUpdateRequestDto, Category category) {
        Plant plant = Optional.ofNullable(plantRepository.findOneById(plantUpdateRequestDto.getPlantId()))
                .orElseThrow(() -> new CustomException(ErrorCode.PLANT_NOT_FOUND));
        plant.updateInfo(plantUpdateRequestDto, category);
    }
}
