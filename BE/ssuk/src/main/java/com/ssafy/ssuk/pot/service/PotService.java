package com.ssafy.ssuk.pot.service;

import com.ssafy.ssuk.exception.dto.CustomException;
import com.ssafy.ssuk.pot.domain.Pot;
import com.ssafy.ssuk.pot.dto.response.PotResponseDto;
import com.ssafy.ssuk.pot.dto.response.PotSlideResponseDto;

import java.util.List;

public interface PotService {
    // 조회
    List<PotResponseDto> findByUser_Id(Integer user_id);


    //등록
    void save(Pot pot) throws CustomException;

    //삭제
    void delete(Integer potId, Integer userId);

    // 슬라이드용 화분 조회
    List<PotSlideResponseDto> getSlidePotList(Integer userId);
}
