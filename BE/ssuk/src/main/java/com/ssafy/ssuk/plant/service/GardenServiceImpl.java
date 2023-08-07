package com.ssafy.ssuk.plant.service;

import com.ssafy.ssuk.exception.dto.CustomException;
import com.ssafy.ssuk.exception.dto.ErrorCode;
import com.ssafy.ssuk.plant.domain.Garden;
import com.ssafy.ssuk.plant.domain.Plant;
import com.ssafy.ssuk.plant.dto.request.GardenOrdersRequestDto;
import com.ssafy.ssuk.plant.repository.domain.GardenRepository;
import com.ssafy.ssuk.pot.domain.Pot;
import com.ssafy.ssuk.user.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class GardenServiceImpl implements GardenService {

    private final GardenRepository gardenRepository;
    private final EntityManager em;

    @Override
    public Garden findUsingByPotId(Integer potId) {
        return Optional.ofNullable(gardenRepository.findUsingByPotId(potId)).orElseThrow(() -> new CustomException(ErrorCode.GARDEN_NOT_FOUND));
    }

    @Override
    @Transactional
    public Garden save(User user, Plant plant, Pot pot, String nickname) {
        int orders = findAllByUserId(user.getId()).size();
        Garden garden = new Garden(user, plant, pot, nickname, orders);
        gardenRepository.save(garden);
        return garden;
    }

    @Override
    public Garden findOndById(Integer id) {
        return gardenRepository.findOneById(id);
    }

    @Override
    @Transactional
    public void deleteFromPot(Integer userId, Integer gardenId) {
        // 정원 확인(해당 심은 식물의 소유자가 맞는지)
        Garden garden = Optional.ofNullable(gardenRepository.findOneById(gardenId)).orElseThrow(() -> new CustomException(ErrorCode.GARDEN_NOT_FOUND));
        if (garden.getUser().getId() != userId) {
            throw new CustomException(ErrorCode.GARDEN_NOT_MATCH_USER);
        }
        garden.unUsePot();
    }

    @Override
    @Transactional
    public void renameGarden(Integer gardenId, Integer userId, String nickname) {
        // 정원 확인(해당 심은 식물의 소유자가 맞는지)
        Garden garden = Optional.ofNullable(gardenRepository.findOneById(gardenId)).orElseThrow(() -> new CustomException(ErrorCode.GARDEN_NOT_FOUND));
        if (garden.getUser().getId() != userId) {
           throw new CustomException(ErrorCode.GARDEN_NOT_MATCH_USER);
        }
        garden.rename(nickname);
    }

    @Override
    public Garden findOndByIdAndUserId(Integer gardenId, Integer userId) {
        return Optional.ofNullable(gardenRepository.findOneByIdAndUserId(gardenId, userId)).orElseThrow(() -> new CustomException(ErrorCode.GARDEN_NOT_FOUND));
    }

    @Override
    public List<Garden> findAllByUserId(Integer userId, Boolean isUse) {
        return gardenRepository.findAllByUserId(userId, isUse);
    }

    @Override
    public List<Garden> findAllByUserId(Integer userId) {
        List<Garden> gardens = gardenRepository.findAllByUserId(userId);
        gardens.sort((g1, g2) -> g1.getOrders().compareTo(g2.getOrders()));
        return gardens;
    }

    @Override
    @Transactional
    public void deleteFromGarden(Integer userId, Integer gardenId) {
        Garden garden = Optional.ofNullable(gardenRepository.findOneByIdAndUserId(gardenId, userId)).orElseThrow(() -> new CustomException(ErrorCode.GARDEN_NOT_FOUND));
        garden.removeFromGarden();
    }

    @Override
    @Transactional
    public void modifyOrders(Integer userId, List<Integer> gardenIdsOrderBy) {
        List<Integer> gardenIds = new ArrayList<>();
        Map<Integer, Integer> map = new HashMap<>();

        for(int i = 0; i < gardenIdsOrderBy.size(); i++) {
            map.put(gardenIdsOrderBy.get(i), i);
            log.debug("key, value={} / {}", gardenIdsOrderBy.get(i), i);
        }
        List<Garden> gardenList = gardenRepository.findAllByUserId(userId);
        gardenList.forEach(g -> {
                    Integer order = map.get(g.getId());
                    if (order == null){
                        gardenList.forEach(errorGarden -> em.detach(errorGarden));
                        throw new CustomException(ErrorCode.GARDEN_NOT_FOUND);
                    }
                    g.modifyOrders(order);
                    log.debug("{} / {}", g.getId(), g.getOrders());
        });
    }

    @Override
    public boolean isDuplicateUsingByPotId(Integer potId) {
        Garden garden = gardenRepository.findUsingByPotId(potId);
        if (garden == null) {
            return true;
        } else {
            return false;
        }
    }
}
