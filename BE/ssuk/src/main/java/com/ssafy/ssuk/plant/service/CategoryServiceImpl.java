package com.ssafy.ssuk.plant.service;

import com.ssafy.ssuk.plant.domain.Category;
import com.ssafy.ssuk.plant.repository.query.CategoryQueryRepository;
import com.ssafy.ssuk.plant.repository.domain.CategoryRepository;
import com.ssafy.ssuk.plant.dto.response.TotalCategoryResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryQueryRepository categoryQueryRepository;

    @Override
    @Transactional
    public void savePlantCategory(Category plantCategory) {
        categoryRepository.save(plantCategory);
    }

    @Override
    @Transactional
    public boolean modifyPlantCategory(Integer categoryId, String updateName) {
        Category plantCategory = categoryRepository.findOneById(categoryId);
        if(plantCategory == null)
            return false;
        plantCategory.setName(updateName);
        return true;
    }

    @Override
    public List<Category> findPlantCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category findOneById(Integer categoryId) {
        return categoryRepository.findOneById(categoryId);
    }

    @Override
    public boolean isDuplicateName(String name) {
        return !categoryRepository.findAllByName(name).isEmpty();
    }

    @Override
    public boolean isDuplicateName(Integer id, String name) {
        return !categoryRepository.findAllByNameExceptId(id, name).isEmpty();
    }

    @Override
    public List<TotalCategoryResponseDto> findTotalInfo() {
        return categoryQueryRepository.findTotalInfo();
    }

    @Override
    public List<TotalCategoryResponseDto> findTotalInfo(List<Integer> categoryIds, Integer userId) {
        return categoryQueryRepository.findTotalInfo(categoryIds, userId);
    }
}
