package com.ssafy.ssuk.plant.category.service;

import com.ssafy.ssuk.plant.category.PlantCategory;
import com.ssafy.ssuk.plant.category.repository.PlantCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PlantCategoryServiceImpl implements PlantCategoryService{

    private final PlantCategoryRepository plantCategoryRepository;

    @Override
    @Transactional
    public void savePlantCategory(PlantCategory plantCategory) {
        plantCategoryRepository.save(plantCategory);
    }

    @Override
    @Transactional
    public boolean updatePlantCategory(Integer categoryId, String updateName) {
        PlantCategory plantCategory = plantCategoryRepository.findOneById(categoryId);
        if(plantCategory == null)
            return false;
        plantCategory.setName(updateName);
        return true;
    }

    @Override
    public List<PlantCategory> findPlantCategories() {
        return plantCategoryRepository.findAll();
    }

    @Override
    public PlantCategory findOneById(Integer categoryId) {
        return plantCategoryRepository.findOneById(categoryId);
    }

    @Override
    public boolean isDuplicateName(String name) {
        return !plantCategoryRepository.findAllByName(name).isEmpty();
    }

    @Override
    public boolean isDuplicateName(Integer id, String name) {
        return !plantCategoryRepository.findAllByNameExceptId(id, name).isEmpty();
    }
}
