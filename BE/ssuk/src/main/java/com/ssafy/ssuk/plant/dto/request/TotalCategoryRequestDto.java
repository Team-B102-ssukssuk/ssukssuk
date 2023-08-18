package com.ssafy.ssuk.plant.dto.request;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Data
public class TotalCategoryRequestDto {
    @NotNull
    List<Integer> categoryIds;
}
