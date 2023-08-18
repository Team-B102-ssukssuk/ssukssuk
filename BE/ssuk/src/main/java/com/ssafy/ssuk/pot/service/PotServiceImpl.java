package com.ssafy.ssuk.pot.service;

import com.ssafy.ssuk.exception.dto.CustomException;
import com.ssafy.ssuk.exception.dto.ErrorCode;
import com.ssafy.ssuk.plant.repository.domain.GardenRepository;
import com.ssafy.ssuk.pot.domain.Pot;
import com.ssafy.ssuk.pot.dto.response.PotResponseDto;
import com.ssafy.ssuk.pot.dto.response.PotSlideResponseDto;
import com.ssafy.ssuk.pot.repository.PotRepository;
import com.ssafy.ssuk.user.domain.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
public class PotServiceImpl implements PotService {

    PotRepository potRepository;
    GardenRepository gardenRepository;

    @Autowired
    public PotServiceImpl(PotRepository potRepository, GardenRepository gardenRepository) {
        this.potRepository = potRepository;
        this.gardenRepository = gardenRepository;
    }

    //화분 조회 (유저가 가지고 있는 전체 화분 조회)
    @Override
    public List<PotResponseDto> findByUser_Id(Integer user_id) {
        List<PotResponseDto> result = potRepository.findByUser_Id(user_id);

        return result;
    }

    @Override
    public void save(Pot pot) throws CustomException {
        Pot findPot = potRepository.findBySerialNumber(pot.getSerialNumber());

        if (findPot == null)
            throw new CustomException(ErrorCode.INVALID_SERIAL_NUMBER);

        //개선의 여지, user안에 내부적으로 클래스 만들까?
        //db에서 유저를 조회해서 들고올까? 왜 와이? -> 유저 아이디 잘못된거 날라올수도있음.
        User user = new User();
        user.setId(pot.getUser().getId());

        // 조회 후, 등록여부가 false 면 등록이 가능
        if (!findPot.getIsRegisted()) {
            findPot.setUser(user);
            findPot.setRegistedDate(LocalDateTime.now());
            findPot.setIsRegisted(true);
            potRepository.save(findPot);
        } else {// 조회 후, 등록여부가 true면 등록이 불가능
            throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
        }

    }

    //화분 삭제
    @Override
    @Transactional
    public void delete(Integer potId, Integer userId) {
        //Optional<Pot> findPot = potRepository.findPotByUser_IdAndPotId(potId, userId);

        Pot updatePot = potRepository.findPotByUser_IdAndPotId(potId, userId)
                .orElseThrow(() -> new CustomException(ErrorCode.POT_NOT_FOUND));
        updatePot.setUser(null);
        updatePot.setRegistedDate(null);
        updatePot.setIsRegisted(false);

        gardenRepository.deleteFromPot(userId, potId);

        potRepository.save(updatePot);
    }

    @Override
    public List<PotSlideResponseDto> getSlidePotList(Integer userId) {
        List<PotSlideResponseDto> potSlideList = potRepository.getSlidePotList(userId);
        return potSlideList;
    }

}
