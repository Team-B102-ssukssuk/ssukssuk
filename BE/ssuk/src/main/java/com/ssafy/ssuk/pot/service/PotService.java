package com.ssafy.ssuk.pot.service;

import com.ssafy.ssuk.exception.dto.CustomException;
import com.ssafy.ssuk.plant.domain.Garden;
import com.ssafy.ssuk.pot.domain.Pot;
import com.ssafy.ssuk.pot.dto.requset.PotInsertDto;
import com.ssafy.ssuk.pot.dto.response.PotResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

public interface PotService {
    // 조회
    List<PotResponseDto> findByUser_Id(Integer user_id);


    //등록
    void save(Pot pot) throws CustomException;

    //삭제
    void delete(Integer potId, Integer userId);
}
