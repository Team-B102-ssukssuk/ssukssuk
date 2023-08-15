package com.ssafy.ssuk.measurement.controller;

import com.ssafy.ssuk.badge.domain.BadgeCode;
import com.ssafy.ssuk.badge.service.BadgeService;
import com.ssafy.ssuk.exception.dto.CustomException;
import com.ssafy.ssuk.exception.dto.ErrorCode;
import com.ssafy.ssuk.measurement.domain.Measurement;
import com.ssafy.ssuk.measurement.domain.SensorType;
import com.ssafy.ssuk.measurement.dto.request.RaspberryRequestDto;
import com.ssafy.ssuk.measurement.dto.request.UploadRequestDto;
import com.ssafy.ssuk.measurement.dto.response.MeasurementResponseDto;
import com.ssafy.ssuk.measurement.service.MeasurementService;
import com.ssafy.ssuk.notify.service.NotificationService;
import com.ssafy.ssuk.utils.response.CommonResponseEntity;
import com.ssafy.ssuk.utils.response.SuccessCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@Slf4j
@RequestMapping("/sensor")
public class MeasurementController {

    private final MeasurementService mesurementService;
    private final SimpMessagingTemplate template;
    private final BadgeService badgeService;
    private final NotificationService notificationService;

    @Autowired
    public MeasurementController(MeasurementService mesurementService, SimpMessagingTemplate template, BadgeService badgeService, NotificationService notificationService) {
        this.mesurementService = mesurementService;
        this.template = template;
        this.badgeService = badgeService;
        this.notificationService = notificationService;
    }

    //조회
    @GetMapping("/{pot_id}")
    ResponseEntity<?> findByUser_IdAndPot_Id(@RequestAttribute(required = true) Integer userId, @PathVariable Integer pot_id) {
        List<Measurement> find = mesurementService.findRecentValueByPot_Id(userId, pot_id);

        log.info("센서 조회");
        return CommonResponseEntity.getResponseEntity(SuccessCode.OK,find);
    }


    //급수 요청
    @GetMapping("/water/{potId}")
    ResponseEntity<?> insertWater(@RequestAttribute Integer userId, @PathVariable Integer potId) {
        log.info("물급수 요청");
        Measurement findMeasurement = mesurementService.findByPot_Id(potId).get(0);

        String serialNumber = findMeasurement.getPot().getSerialNumber();
        log.info("물 급수 요청 : " + serialNumber);
        template.convertAndSend("/sub/socket/room/" + serialNumber, new RaspberryRequestDto(1, "물 급수 요청"));

        // 여기에 업적확인하고 추가하자
        if (!badgeService.checkUserBadge(BadgeCode.정원의_수호자.getCode(), userId)) {
            badgeService.saveUserBadge(BadgeCode.정원의_수호자.getCode(), userId);
            notificationService.pushAndInsertNotificationForBadge(userId, BadgeCode.정원의_수호자);
            log.info("업적달성");
        }
        return ResponseEntity.ok("물 급수 완료");
    }

    //나중에 시큐리티 필터 빼달라고 하기
    @PostMapping("/upload")
    ResponseEntity<?> updateLevel(@RequestBody @Validated UploadRequestDto uploadRequestDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new CustomException(ErrorCode.INPUT_EXCEPTION);
        }
        log.debug(String.valueOf(uploadRequestDto.getPotId()) + " upload 컨트롤러");

        Integer userId = Optional.ofNullable(mesurementService.updateLevel(uploadRequestDto))
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        Integer level = uploadRequestDto.getLevel();
        if (level == 3 && !badgeService.checkUserBadge(BadgeCode.쑥쑥을_위하여.getCode(), userId)) {
            badgeService.saveUserBadge(BadgeCode.쑥쑥을_위하여.getCode(), userId);
            notificationService.pushAndInsertNotificationForBadge(userId, BadgeCode.쑥쑥을_위하여);
            log.info("업적달성");
        } else if (level == 2 && !badgeService.checkUserBadge(BadgeCode.오잉_쑥쑥이의_상태가.getCode(), userId)) {
            badgeService.saveUserBadge(BadgeCode.오잉_쑥쑥이의_상태가.getCode(), userId);
            notificationService.pushAndInsertNotificationForBadge(userId, BadgeCode.오잉_쑥쑥이의_상태가);
            log.info("업적 달성");
        }


        return ResponseEntity.ok().build();
    }

    // 온도
    @GetMapping("/temperature/{potId}")
    ResponseEntity<?> selectTemp(@RequestAttribute Integer userId, @PathVariable Integer potId) {
        log.info("온도 그래프 요청");
        List<MeasurementResponseDto> result = mesurementService.selectValueByPot_id(potId, SensorType.T);

        return CommonResponseEntity.getResponseEntity(SuccessCode.OK, result);
    }

    // 습도
    @GetMapping("/humidity/{potId}")
    ResponseEntity<?> selectHumidity(@RequestAttribute Integer userId, @PathVariable Integer potId) {
        log.info("습도 그래프 요청");
        List<MeasurementResponseDto> result = mesurementService.selectValueByPot_id(potId, SensorType.H);
        return CommonResponseEntity.getResponseEntity(SuccessCode.OK, result);
    }

    // 토양 수분
    @GetMapping("/ground/{potId}")
    ResponseEntity<?> selectGround(@RequestAttribute Integer userId, @PathVariable Integer potId) {
        log.info("토양 수분");
        List<MeasurementResponseDto> result = mesurementService.selectValueByPot_id(potId, SensorType.W);
        return CommonResponseEntity.getResponseEntity(SuccessCode.OK, result);
    }


}
