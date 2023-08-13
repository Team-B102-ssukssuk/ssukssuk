package com.ssafy.ssuk.plant.repository.domain;

import com.ssafy.ssuk.plant.domain.Garden;
import com.ssafy.ssuk.plant.dto.response.GardenSearchOneResponseDto;

import java.util.Collection;
import java.util.List;
import java.util.Map;

public interface GardenRepository {
    Garden findUsingByPotId(Integer potId);

    void save(Garden garden);

    Garden findOneById(Integer id);

    Garden findOneByIdAndUserId(Integer gardenId, Integer userId);

    List<Garden> findAllByUserId(Integer userId, Boolean isUse);

    List<Garden> findAllByUserId(Integer userId);

    List<Garden> findOnlyAllByUserId(int userId);

    void minusOrders(int userId, int orders);

    List<Garden> findGardenByPotId(Integer potId); //지민

    void deleteFromPot(Integer userId, Integer potId);
}
