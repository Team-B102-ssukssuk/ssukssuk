package com.ssafy.ssuk.plant.repository.domain;

import com.ssafy.ssuk.plant.domain.Info;

import java.util.List;

public interface InfoRepository {
    Info findOneById(Integer plantId, Integer level);

    void save(Info info);

    List<Info> findAll(Integer plantId);
}
