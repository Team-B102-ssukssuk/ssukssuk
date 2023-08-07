package com.ssafy.ssuk.plant.dto.response;

import com.ssafy.ssuk.plant.domain.Plant;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

@Data
@Slf4j
public class CategorySearchResponseDto {
//    Integer categoryId;
    public String name;
    List<NameId> subcategories = new ArrayList<>();

    public CategorySearchResponseDto(String name, List<Plant> plants) {
        this.name = name;
        plants.forEach(p -> subcategories.add(new NameId(p.getId(), p.getName())));
    }
}
