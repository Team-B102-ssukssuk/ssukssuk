package com.ssafy.ssuk.plant.service;

import com.ssafy.ssuk.exception.dto.CustomException;
import com.ssafy.ssuk.exception.dto.ErrorCode;
import com.ssafy.ssuk.plant.domain.Info;
import com.ssafy.ssuk.plant.dto.request.InfoRegisterRequestDto;
import com.ssafy.ssuk.plant.dto.request.InfoUpdateRequestDto;
import com.ssafy.ssuk.plant.repository.domain.InfoRepository;
import com.ssafy.ssuk.plant.domain.Plant;
import com.ssafy.ssuk.plant.repository.domain.PlantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class InfoServiceImpl implements InfoService {

    private final InfoRepository infoRepository;

    @Override
    public boolean isDuplicated(Integer plantId, Integer level) {
        Info info = infoRepository.findOneById(plantId, level);
        return info != null;
    }

    @Override
    @Transactional
    public void saveInfo(InfoRegisterRequestDto infoRegisterRequestDto, Plant plant) {
        infoRepository.save(new Info(infoRegisterRequestDto, plant));
    }

    @Override
    public List<Info> findAll(Integer plantId) {
        return infoRepository.findAll(plantId);
    }

    @Override
    public Info findOne(Integer plantId, Integer level) {
        return Optional.ofNullable(infoRepository.findOneById(plantId, level))
                .orElseThrow(() -> new CustomException(ErrorCode.PLANT_INFO_NOT_FOUND));
    }

    @Override
    @Transactional
    public void modifyInfo(InfoUpdateRequestDto infoUpdateRequestDto) {

        Integer plantId = infoUpdateRequestDto.getPlantId();
        Integer level = infoUpdateRequestDto.getLevel();

        Info info = Optional.ofNullable(infoRepository.findOneById(plantId, level))
                .orElseThrow(() -> new CustomException(ErrorCode.PLANT_INFO_NOT_FOUND));

        info.modifyInfo(infoUpdateRequestDto);
    }
}
