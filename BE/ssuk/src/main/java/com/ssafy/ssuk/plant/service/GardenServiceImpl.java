package com.ssafy.ssuk.plant.service;

import com.ssafy.ssuk.plant.domain.Garden;
import com.ssafy.ssuk.plant.domain.Plant;
import com.ssafy.ssuk.plant.dto.response.GardenSearchOneResponseDto;
import com.ssafy.ssuk.plant.repository.domain.GardenRepository;
import com.ssafy.ssuk.pot.domain.Pot;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GardenServiceImpl implements GardenService {

    private final GardenRepository gardenRepository;

    @Override
    public Garden findUsingByPotId(Integer potId) {
        return gardenRepository.findUsingByPotId(potId);
    }

    @Override
    @Transactional
    public void save(Integer userId, Plant plant, Pot pot, String nickname) {
        Garden garden = new Garden(userId, plant, pot, nickname);
        gardenRepository.save(garden);
    }

    @Override
    public Garden findOndById(Integer id) {
        return gardenRepository.findOneById(id);
    }

    @Override
    @Transactional
    public boolean deleteGarden(Integer userId, Integer gardenId) {
        // 정원 확인(해당 심은 식물의 소유자가 맞는지)
        Garden garden = gardenRepository.findOneById(gardenId);
        if(garden == null || garden.getUserId() != userId) {
            return false;
        }
        garden.unUseGarden();
        return true;
    }

    @Override
    @Transactional
    public boolean renameGarden(Integer gardenId, Integer userId, String nickname) {
        // 정원 확인(해당 심은 식물의 소유자가 맞는지)
        Garden garden = gardenRepository.findOneById(gardenId);
        if(garden == null || garden.getUserId() != userId) {
            return false;
        }
        garden.rename(nickname);
        return true;
    }

    @Override
    public Garden findOndByIdAndUserId(Integer gardenId, Integer userId) {
        return gardenRepository.findOneByIdAndUserId(gardenId, userId);
    }

    @Override
    public List<Garden> findAllByUserId(Integer userId, Boolean isUse) {
        return gardenRepository.findAllByUserId(userId, isUse);
    }

    @Override
    public List<Garden> findAllByUserId(Integer userId) {
        return gardenRepository.findAllByUserId(userId);
    }
}
