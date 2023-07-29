package com.ssafy.ssuk.plant.category.service;

import com.ssafy.ssuk.plant.category.PlantCategory;

import java.util.List;

public interface PlantCategoryService {

    public void savePlantCategory(PlantCategory plantCategory);

    public boolean updatePlantCategory(Integer categoryId, String updateName);

    public List<PlantCategory> findPlantCategories();

    public PlantCategory findOneById(Integer categoryId);

    public boolean isDuplicateName(String name);

    /**
     * 해당 id를 가진 category 이외에 중복된 네임이 있는지 확인
     */
    public boolean isDuplicateName(Integer id, String name);
}
