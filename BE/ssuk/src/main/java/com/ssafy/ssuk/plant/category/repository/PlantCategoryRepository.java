package com.ssafy.ssuk.plant.category.repository;

import com.ssafy.ssuk.plant.category.PlantCategory;

import java.util.Collection;
import java.util.List;

public interface PlantCategoryRepository {
    public void save(PlantCategory plantCategory);
    public PlantCategory findOneById(Integer id);
    public List<PlantCategory> findAll();
    public List<PlantCategory> findAllByName(String name);
    public Collection<Object> findAllByNameExceptId(Integer id, String name);
}
