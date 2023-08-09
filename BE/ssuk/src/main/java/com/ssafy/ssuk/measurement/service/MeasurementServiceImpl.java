package com.ssafy.ssuk.measurement.service;

import com.ssafy.ssuk.measurement.domain.Measurement;
import com.ssafy.ssuk.measurement.domain.SensorType;
import com.ssafy.ssuk.measurement.dto.socket.SensorMessageDto;
import com.ssafy.ssuk.measurement.repository.MeasurementRepository;
import com.ssafy.ssuk.notify.domain.Notification;
import com.ssafy.ssuk.notify.domain.NotificationType;
import com.ssafy.ssuk.notify.repository.NotificationRepository;
import com.ssafy.ssuk.notify.service.FcmService;
import com.ssafy.ssuk.plant.domain.Garden;
import com.ssafy.ssuk.plant.repository.domain.GardenRepository;
import com.ssafy.ssuk.user.domain.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class MeasurementServiceImpl implements MeasurementService {
    private final MeasurementRepository measurementRepository;
    private final GardenRepository gardenRepository;
    private final FcmService fcmService;
    private final NotificationRepository notificationRepository;

    @Autowired
    public MeasurementServiceImpl(MeasurementRepository measurementRepository, GardenRepository gardenRepository, FcmService fcmService, NotificationRepository notificationRepository) {
        this.measurementRepository = measurementRepository;
        this.gardenRepository = gardenRepository;
        this.fcmService = fcmService;
        this.notificationRepository = notificationRepository;
    }

    @Override
    public List<Measurement> findRecentValueByPot_Id(Integer user_id, Integer pot_id) {
        // 해당 유저가 화분을 보유하고 있는지 체킹을 할까? 고려해보자

        //화분아이디로 센서값 뱉기
        return measurementRepository.findRecentValueByPot_Id(pot_id);
    }

    //시리얼 넘버 뱉기
    @Override
    public List<Measurement> findByPot_Id(Integer pot_id) {
        return measurementRepository.findByPot_Id(pot_id);
    }

    //센서값 저장
    @Override
    public void insertMeasurement(Measurement measurement) {
        measurementRepository.save(measurement);
    }

    //센서값 비교

    @Override
    public void checkMeasurement(SensorMessageDto sensorMessageDto) {
        List<Garden> gardens = gardenRepository.findGardenByPotId(sensorMessageDto.getPotId());

        if(sensorMessageDto.getSensorType().equals(SensorType.M))
        {
            if(gardens.get(0).getPlant().getMoistureMin() > sensorMessageDto.getMeasurementValue())
            {
                Integer userId = gardens.get(0).getUser().getId();
                String nickName = gardens.get(0).getNickname();

                log.info("물이 없네요 선생님");

                //push 알림
                fcmService.sendPushTo(userId, "물 부족", nickName + "이(가) 물이 부족해요");

                //알림 테이블 저장
                Notification notification = Notification.builder().user(gardens.get(0).getUser())
                        .garden(gardens.get(0))
                        .pot(gardens.get(0).getPot())
                        .title("test")
                        .body("hi")
                        .notificationType(NotificationType.W).build();
                notificationRepository.save(notification);


            }
        }
    }
}
