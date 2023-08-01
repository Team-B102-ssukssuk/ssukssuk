package com.ssafy.ssuk.plant.repository.query;



import com.ssafy.ssuk.plant.dto.response.TotalCategoryResponseDto;

import java.util.List;

public interface CategoryQueryRepository {
    List<TotalCategoryResponseDto> findTotalInfo();
    List<TotalCategoryResponseDto> findTotalInfo(List<Integer> catergoryIds, int userId);
}
