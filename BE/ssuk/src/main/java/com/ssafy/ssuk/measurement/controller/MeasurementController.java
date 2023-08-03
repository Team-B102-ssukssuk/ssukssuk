package com.ssafy.ssuk.measurement.controller;

import com.ssafy.ssuk.measurement.domain.Measurement;
import com.ssafy.ssuk.measurement.dto.request.RaspberryRequestDto;
import com.ssafy.ssuk.measurement.dto.socket.SensorMessageDto;
import com.ssafy.ssuk.measurement.service.MeasurementService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@Slf4j
@RequestMapping("/sensor")
public class MeasurementController {

    private final MeasurementService mesurementService;
    private final SimpMessagingTemplate template;

    @Autowired
    public MeasurementController(MeasurementService mesurementService, SimpMessagingTemplate template) {
        this.mesurementService = mesurementService;
        this.template = template;
    }

    //조회
    @GetMapping("/{pot_id}")
    ResponseEntity<?> findByUser_IdAndPot_Id(@RequestAttribute(required = true) Integer userId, @PathVariable Integer pot_id) {
        List<Measurement> result = mesurementService.findRecentValueByPot_Id(userId, pot_id);

        return ResponseEntity.ok(result);
    }

//    @GetMapping("/water/{potId}")
//    ResponseEntity<?> test(@RequestAttribute Integer userId, @PathVariable Integer potId)
//    {
//        return ResponseEntity.ok("hi");
//    }

    //급수 요청
    @GetMapping("/water/{potId}")
    ResponseEntity<?> insertWater(@PathVariable Integer potId)
    {
        log.info("물급수 요청");
        Measurement findMeasurement = mesurementService.findByPot_Id(potId).get(0);

        String serialNumber = findMeasurement.getPot().getSerialNumber();
        log.info("물 급수 요청 : " + serialNumber);
        template.convertAndSend("/sub/socket/room/" + serialNumber, new RaspberryRequestDto(1, "물 급수 요청"));

        return ResponseEntity.ok("물 급수 완료");
    }

}
