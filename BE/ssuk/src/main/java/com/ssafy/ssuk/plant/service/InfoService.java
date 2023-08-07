package com.ssafy.ssuk.plant.service;

import com.ssafy.ssuk.plant.domain.Info;
import com.ssafy.ssuk.plant.dto.request.InfoRegisterRequestDto;
import com.ssafy.ssuk.plant.dto.request.InfoUpdateRequestDto;
import com.ssafy.ssuk.plant.domain.Plant;

import java.util.List;

public interface InfoService {
    boolean isDuplicated(Integer plantId, Integer level);

    void saveInfo(InfoRegisterRequestDto infoRegisterRequestDto, Plant plant);

    List<Info> findAll(Integer plantId);

    Info findOne(Integer plantId, Integer level);

    void modifyInfo(InfoUpdateRequestDto infoUpdateRequestDto);
}
