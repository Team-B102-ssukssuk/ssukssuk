package com.ssafy.ssuk.plant.service;

import com.ssafy.ssuk.plant.domain.Info;
import com.ssafy.ssuk.plant.dto.request.InfoRegisterRequestDto;
import com.ssafy.ssuk.plant.dto.request.InfoUpdateRequestDto;
import com.ssafy.ssuk.plant.repository.domain.InfoRepository;
import com.ssafy.ssuk.plant.domain.Plant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
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
        return infoRepository.findOneById(plantId, level);
    }

    @Override
    @Transactional
    public boolean modifyInfo(InfoUpdateRequestDto infoUpdateRequestDto) {

        Integer plantId = infoUpdateRequestDto.getPlantId();
        Integer level = infoUpdateRequestDto.getLevel();

        Info info = infoRepository.findOneById(plantId, level);

        if(info == null)
            return false;

        info.modifyInfo(infoUpdateRequestDto);
        return true;
    }
}
