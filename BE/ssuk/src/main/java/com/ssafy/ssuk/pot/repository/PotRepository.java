package com.ssafy.ssuk.pot.repository;

import com.ssafy.ssuk.plant.domain.Garden;
import com.ssafy.ssuk.pot.domain.Pot;
import com.ssafy.ssuk.pot.dto.response.PotResponseDto;
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
    @Query(value = "select p from Pot p where p.id = :pot_id and p.user.id =:user_id")
    Pot selectPotBySerialNumAndUserId(@Param("pot_id") Integer potId, @Param("user_id") Integer user_id);

    //조회
    @Query(value = "select new com.ssafy.ssuk.pot.dto.response.PotResponseDto(p.id, p.user.id, p.registedDate, g.level, g.nickname, g.isUse, g.plant.id, g.id) "
            + "from Pot p left join Garden g on g.pot.id = p.id and g.isUse != false "
            + " where p.user.id = :userId" )
    List<PotResponseDto> findByUser_Id(@Param("userId") Integer user_id);


    // 감사합니다 -덕용-
    @Override
    Pot getReferenceById(Integer integer);
}
