package com.ssafy.ssuk.pot.controller;

import com.ssafy.ssuk.pot.domain.Pot;
import com.ssafy.ssuk.pot.dto.requset.PotInsertDto;
import com.ssafy.ssuk.pot.mapper.PotMapper;
import com.ssafy.ssuk.pot.service.PotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/pot")
public class PotController {
    private final PotService potService;
    private final PotMapper potMapper;

    @Autowired
    public PotController(PotService potService, PotMapper potMapper)
    {
        this.potService = potService;
        this.potMapper = potMapper;
    }

    //보유한 화분 전체 조회
    @GetMapping("/{user_id}")
    public ResponseEntity<?> potLIst(@PathVariable("user_id") Integer user_id)
    {
        List<Pot> potList = potService.findByUser_Id(user_id);

        return ResponseEntity.ok(potList);
    }

    //화분 상세 조회

    //화분 등록
    @PostMapping("")
    public ResponseEntity<?> save(@RequestBody PotInsertDto potInsertDto)
    {
        Pot pot = potMapper.insertDtoToPot(potInsertDto);

        potService.save(pot);

        return ResponseEntity.ok().build();
        //엔티티 변환
    }

    //화분 삭제
    @PutMapping("")
    public ResponseEntity<?> delete(@RequestBody PotInsertDto potInsertDto)
    {
        //Pot pot = potMapper.insertDtoToPot(potInsertDto);

        potService.delete(potInsertDto);

        return ResponseEntity.ok().build();
    }

}
