package com.ssafy.ssuk.plant.service;

import com.ssafy.ssuk.plant.domain.Garden;
import com.ssafy.ssuk.plant.domain.Plant;
import com.ssafy.ssuk.plant.dto.request.GardenOrdersRequestDto;
import com.ssafy.ssuk.plant.dto.request.GardenRecordRequestDto;
import com.ssafy.ssuk.plant.dto.request.GardenRenameRequestDto;
import com.ssafy.ssuk.plant.dto.response.GardenSearchOneResponseDto;
import com.ssafy.ssuk.pot.domain.Pot;
import com.ssafy.ssuk.user.domain.User;

import java.util.Collection;
import java.util.List;

public interface GardenService {
    Garden findUsingByPotId(Integer potId);

    Garden save(User user, Plant plant, Pot pot, String nickname);

    Garden findOndById(Integer id);

    void deleteFromPot(Integer userId, Integer gardenId);

    void renameGarden(Integer gardenId, Integer userId, String nickname);

    Garden findOndByIdAndUserId(Integer gardenId, Integer userId);

    List<Garden> findAllByUserId(Integer userId, Boolean isUse);

    List<Garden> findAllByUserId(Integer userId);

    void deleteFromGarden(Integer userId, Integer gardenId);

    void modifyOrders(Integer userId, List<Integer> gardenIdsOrderBy);

    boolean isDuplicateUsingByPotId(Integer potId);

    void modifyRecord(Integer userId, GardenRecordRequestDto gardenRecordRequestDto);
}
