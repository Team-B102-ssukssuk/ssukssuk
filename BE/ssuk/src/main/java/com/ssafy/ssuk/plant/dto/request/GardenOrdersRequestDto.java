package com.ssafy.ssuk.plant.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class GardenOrdersRequestDto {
    List<Integer> gardenIdsOrderBy;
}



