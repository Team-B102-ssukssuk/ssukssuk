package com.ssafy.ssuk.plant.repository.domain;

import com.ssafy.ssuk.plant.domain.Garden;
import com.ssafy.ssuk.plant.dto.response.GardenSearchOneResponseDto;

import java.util.Collection;
import java.util.List;

public interface GardenRepository {
    Garden findUsingByPotId(Integer potId);

    void save(Garden garden);

    Garden findOneById(Integer id);

    Garden findOneByIdAndUserId(Integer gardenId, Integer userId);

    List<Garden> findAllByUserId(Integer userId, Boolean isUse);

    List<Garden> findAllByUserId(Integer userId);

    void removeFromGarden(Integer gardenId);

    List<Garden> findAllByUserIdAndIds(Integer userId, List<Integer> gardenIds);
}
