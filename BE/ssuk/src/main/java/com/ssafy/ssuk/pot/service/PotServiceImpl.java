package com.ssafy.ssuk.pot.service;

import com.ssafy.ssuk.exception.dto.CustomException;
import com.ssafy.ssuk.exception.dto.ErrorCode;
import com.ssafy.ssuk.pot.domain.Pot;
import com.ssafy.ssuk.pot.dto.requset.PotInsertDto;
import com.ssafy.ssuk.pot.repository.PotRepository;
import com.ssafy.ssuk.user.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PotServiceImpl implements PotService {

    PotRepository potRepository;

    @Autowired
    public PotServiceImpl(PotRepository potRepository) {
        this.potRepository = potRepository;
    }

    //화분 조회 (유저가 가지고 있는 전체 화분 조회)
    @Override
    public List<Pot> findByUser_Id(Integer user_id) {

        return potRepository.findByUser_Id(user_id);
    }

    @Override
    public void save(Pot pot) throws CustomException {
        Pot findPot = potRepository.findBySerialNumber(pot.getSerialNumber());

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
        }
        else {// 조회 후, 등록여부가 true면 등록이 불가능
            throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
        }

    }

    //화분 삭제
    @Override
    public void delete(PotInsertDto potInsertDto) {
        Pot findPot = potRepository.selectPotBySerialNumAndUserId(potInsertDto.getUserId(),potInsertDto.getSerialNumber());

        if(findPot != null)
        {
            findPot.setUser(null);
            findPot.setIsRegisted(false);
            potRepository.save(findPot);
        }
        else { // 예외처리

        }
    }
}
