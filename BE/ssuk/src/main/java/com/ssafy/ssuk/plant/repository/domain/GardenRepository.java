package com.ssafy.ssuk.plant.repository.domain;

import com.ssafy.ssuk.plant.domain.Garden;

public interface GardenRepository {
    Garden findUsingByPotId(Integer potId);

    void save(Garden garden);

    Garden findOneById(Integer id);
}
