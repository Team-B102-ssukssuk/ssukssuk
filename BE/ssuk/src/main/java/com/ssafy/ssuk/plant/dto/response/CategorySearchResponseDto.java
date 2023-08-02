package com.ssafy.ssuk.plant.dto.response;

import com.ssafy.ssuk.plant.domain.Plant;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class CategorySearchResponseDto {
//    Integer categoryId;
    String name;
    List<String> subcategories = new ArrayList<>();

    public CategorySearchResponseDto(String name, List<Plant> plants) {
        this.name = name;
        plants.forEach(p -> subcategories.add(p.getName()));
    }
}
