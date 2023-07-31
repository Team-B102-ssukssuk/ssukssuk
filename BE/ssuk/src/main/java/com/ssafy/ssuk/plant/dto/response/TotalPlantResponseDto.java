package com.ssafy.ssuk.plant.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class TotalPlantResponseDto {
    @JsonIgnore // 얜 출력시키고 싶지 않아서..
    private Integer categoryId;
    private Integer plantId;
    private String plantName;
    private Float tempMax;
    private Float tempMin;
    private Float moistureMax;
    private Float moistureMin;
    private List<TotalInfoResponseDto> plantInfos = new ArrayList<>();

    public TotalPlantResponseDto(Integer categoryId, Integer plantId, String plantName, Float tempMax, Float tempMin, Float moistureMax, Float moistureMin) {
        this.categoryId = categoryId;
        this.plantId = plantId;
        this.plantName = plantName;
        this.tempMax = tempMax;
        this.tempMin = tempMin;
        this.moistureMax = moistureMax;
        this.moistureMin = moistureMin;
    }
}
