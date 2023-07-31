package com.ssafy.ssuk.pot.repository;

import com.ssafy.ssuk.pot.domain.Pot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PotRepository extends JpaRepository<Pot, Integer> {
    //물려있는지 체크
    Pot findBySerialNumber(String serialNumber);

    //해당 유저가 시리얼넘버를 물고 있는지 체크
    @Query(value = "select p from Pot p where p.serialNumber = :serial_number and p.user.id =:user_id")
    Pot selectPotBySerialNumAndUserId(@Param("user_id") Integer user_id, @Param("serial_number") String serialNumber);
    //조회

    List<Pot> findByUser_Id(Integer user_id);

    //상세조회

    //등록

    //수정

    //삭제

    // 감사합니다 -덕용-
    @Override
    Pot getReferenceById(Integer integer);
}
