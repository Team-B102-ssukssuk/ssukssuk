package com.ssafy.ssuk.plant.dto.response;

import com.ssafy.ssuk.plant.domain.Plant;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class PlantSearchResponseDto {

    private Integer plantId;
    private String plantName;
    private Integer categoryId;
    private String categoryName;
    private Float tempMax;
    private Float tempMin;
    private Float moistureMax;
    private Float moistureMin;

    public PlantSearchResponseDto(Plant plant) {
        plantId = plant.getId();
        plantName = plant.getName();
        categoryId = plant.getCategory().getId();
        categoryName = plant.getCategory().getName();
        tempMax = plant.getTempMax();
        tempMin = plant.getTempMin();
        moistureMax = plant.getMoistureMax();
        moistureMin = plant.getMoistureMin();
    }
}
