package com.ssafy.ssuk.pot.controller;

import com.ssafy.ssuk.exception.dto.CustomException;
import com.ssafy.ssuk.exception.dto.ErrorCode;
import com.ssafy.ssuk.plant.service.GardenService;
import com.ssafy.ssuk.pot.domain.Pot;
import com.ssafy.ssuk.pot.dto.requset.PotDeleteDto;
import com.ssafy.ssuk.pot.dto.requset.PotInsertDto;
import com.ssafy.ssuk.pot.dto.response.PotResponseDto;
import com.ssafy.ssuk.pot.dto.response.PotSlideResponseDto;
import com.ssafy.ssuk.pot.mapper.PotMapper;
import com.ssafy.ssuk.pot.service.PotService;
import com.ssafy.ssuk.utils.response.CommonResponseEntity;
import com.ssafy.ssuk.utils.response.SuccessCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/pot")
public class PotController {
    private final PotService potService;
    private final GardenService gardenService;
    private final PotMapper potMapper;

    @Autowired
    public PotController(PotService potService, GardenService gardenService, PotMapper potMapper) {
        this.potService = potService;
        this.gardenService = gardenService;
        this.potMapper = potMapper;
    }

    //보유한 화분 전체 조회
    @GetMapping("")
    public ResponseEntity<?> potLIst(@RequestAttribute Integer userId) {
        List<PotResponseDto> potList = potService.findByUser_Id(userId);
        //List<Garden> result = gardenService.findAllByUserId(userId);

        return ResponseEntity.ok(potList);
    }

    //화분 등록
    @PostMapping("")
    public ResponseEntity<?> save(@RequestAttribute Integer userId, @RequestBody @Validated PotInsertDto potInsertDto, BindingResult bindingResult) throws CustomException {
        if (bindingResult.hasErrors())
            throw new CustomException(ErrorCode.INPUT_EXCEPTION);

        Pot pot = potMapper.insertDtoToPot(potInsertDto, userId);

        potService.save(pot);

        return ResponseEntity.ok("등록 완료");
    }

    //화분 삭제
    @PutMapping("")
    public ResponseEntity<?> delete(@RequestAttribute Integer userId, @RequestBody @Validated PotDeleteDto potDeleteDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            throw new CustomException(ErrorCode.INPUT_EXCEPTION);

        potService.delete(potDeleteDto.getPotId(), userId);

        return ResponseEntity.ok("해제 완료");
    }

    // 슬라이드용 화분 정보 불러오기
    @GetMapping("/slide")
    public ResponseEntity<?> getSlidePotList(@RequestAttribute Integer userId) {
        List<PotSlideResponseDto> potList = potService.getSlidePotList(userId);
        return CommonResponseEntity.getResponseEntity(SuccessCode.OK, potList);
    }
}
