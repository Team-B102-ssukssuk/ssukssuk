package com.ssafy.ssuk.measurement.controller;

import com.ssafy.ssuk.measurement.domain.Measurement;
import com.ssafy.ssuk.measurement.dto.socket.SensorMessageDto;
import com.ssafy.ssuk.measurement.mapper.MeasurementMapper;
import com.ssafy.ssuk.measurement.service.MeasurementService;
import com.ssafy.ssuk.measurement.service.MeasurementServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@Slf4j
public class SensorSokcetController {

    private final SimpMessagingTemplate template;
    private final MeasurementMapper measurementMapper;
    private final MeasurementService measurementService;

    @Autowired
    public SensorSokcetController(SimpMessagingTemplate template, MeasurementMapper measurementMapper, MeasurementService measurementService) {
        this.template = template;
        this.measurementService = measurementService;
        this.measurementMapper = measurementMapper;
    }

    //Client가 SEND할 수 있는 경로
    //stompConfig에서 설정한 applicationDestinationPrefixes와 @MessageMapping 경로가 병합됨
    //"/pub/socket/enter"
    @MessageMapping(value = "/socket/enter")
    public void enter(SensorMessageDto message) {
        //message.setMessage(message.getWriter() + "님이 채팅방에 참여하였습니다.");
        log.info("연결 완료");
        template.convertAndSend("/sub/socket/room/" + message.getSerialNumber(), message);
    }

    @MessageMapping(value = "/socket/sensor")
    public void message(SensorMessageDto message) {
        log.info(message.getSensorType() + " " + message.getMeasurementValue());
        Measurement measurement = measurementMapper.MessageDtoToMeasurement(message);
        measurementService.insertMeasurement(measurement);

        //template.convertAndSend("/sub/socket/room/" + message.getSerialNumber(), message);
    }
}
