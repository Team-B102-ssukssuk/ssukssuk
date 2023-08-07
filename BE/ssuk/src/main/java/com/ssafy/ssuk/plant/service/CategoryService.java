package com.ssafy.ssuk.plant.service;

import com.ssafy.ssuk.plant.domain.Category;
import com.ssafy.ssuk.plant.dto.response.TotalCategoryResponseDto;

import java.util.List;

public interface CategoryService {

    public void savePlantCategory(Category plantCategory);

    public void modifyPlantCategory(Integer categoryId, String updateName);

    public List<Category> findPlantCategories();

    public Category findOneById(Integer categoryId);

    public boolean isDuplicateName(String name);

    /**
     * 해당 id를 가진 category 이외에 중복된 네임이 있는지 확인
     */
    public boolean isDuplicateName(Integer id, String name);

    public List<TotalCategoryResponseDto> findTotalInfo();

    public List<TotalCategoryResponseDto> findTotalInfo(Integer userId);
}
