package com.ssafy.ssuk.pot.service;

import com.ssafy.ssuk.pot.domain.Pot;
import com.ssafy.ssuk.pot.dto.requset.PotInsertDto;
import org.springframework.stereotype.Service;

import java.util.List;

public interface PotService {
    // 조회
    List<Pot> findByUser_Id(Integer user_id);

    // 상세조회

    //등록
    void save(Pot pot);

    //수정

    //삭제
    void delete(PotInsertDto potInsertDto);
}
