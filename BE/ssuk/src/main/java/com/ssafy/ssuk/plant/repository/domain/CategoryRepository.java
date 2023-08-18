package com.ssafy.ssuk.plant.repository.domain;

import com.ssafy.ssuk.plant.domain.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository {
    public void save(Category plantCategory);
    public Category findOneById(Integer id);
    public List<Category> findAll();
    public List<Category> findAllByName(String name);
    public List<Category> findAllByNameExceptId(Integer id, String name);
}
