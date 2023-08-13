package com.ssafy.ssuk.measurement.service;

import com.ssafy.ssuk.measurement.domain.Measurement;
import com.ssafy.ssuk.measurement.domain.SensorType;
import com.ssafy.ssuk.measurement.dto.request.UploadRequestDto;
import com.ssafy.ssuk.measurement.dto.response.MeasurementResponseDto;
import com.ssafy.ssuk.measurement.dto.socket.SensorMessageDto;
import com.ssafy.ssuk.measurement.repository.MeasurementRepository;
import com.ssafy.ssuk.notify.domain.Notification;
import com.ssafy.ssuk.notify.domain.NotificationType;
import com.ssafy.ssuk.notify.repository.NotificationRepository;
import com.ssafy.ssuk.notify.service.FcmService;
import com.ssafy.ssuk.plant.domain.Garden;
import com.ssafy.ssuk.plant.repository.domain.GardenRepository;
import com.ssafy.ssuk.user.domain.User;
import com.ssafy.ssuk.utils.image.S3UploadService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
public class MeasurementServiceImpl implements MeasurementService {
    private final MeasurementRepository measurementRepository;
    private final GardenRepository gardenRepository;
    private final FcmService fcmService;
    private final NotificationRepository notificationRepository;
    private final S3UploadService s3UploadService;

    public MeasurementServiceImpl(MeasurementRepository measurementRepository, GardenRepository gardenRepository, FcmService fcmService, NotificationRepository notificationRepository, S3UploadService s3UploadService) {
        this.measurementRepository = measurementRepository;
        this.gardenRepository = gardenRepository;
        this.fcmService = fcmService;
        this.notificationRepository = notificationRepository;
        this.s3UploadService = s3UploadService;
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
    //추후 모듈화 필요,, 코드 너무 그지같이 짬
    @Override
    @Transactional
    public void checkMeasurement(SensorMessageDto sensorMessageDto) {
        List<Garden> gardens = gardenRepository.findGardenByPotId(sensorMessageDto.getPotId());
        Integer userId = gardens.get(0).getUser().getId();

        if (sensorMessageDto.getSensorType().equals(SensorType.M)) {
            if (gardens.get(0).getPlant().getMoistureMin() > sensorMessageDto.getMeasurementValue()) {

                String nickName = gardens.get(0).getNickname();

                log.info("물이 없네요 선생님");

                LocalDateTime lastTime = gardens.get(0).getPot().getMoistureLastDate();
                //push 알림
                if (lastTime.plusMinutes(30).isBefore(LocalDateTime.now())) {
                    log.info("물 부족 푸쉬 전송");
                    fcmService.sendPushTo(userId, "물 부족", nickName + "이(가) 물이 부족해요");
                    gardens.get(0).getPot().updateMoistueLastDate(LocalDateTime.now());


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

        //물탱크 이슈
        if (sensorMessageDto.getSensorType().equals(SensorType.W) && sensorMessageDto.getMeasurementValue() == 0) {
            log.info("물탱크에 물이 부족합니다");

            LocalDateTime lastTime = gardens.get(0).getPot().getTankLastDate();
            if (lastTime.plusMinutes(30).isBefore(LocalDateTime.now())) {
                log.info("물탱크 푸쉬 전송");
                fcmService.sendPushTo(userId, "물탱크 물 부족", "응애 물 채워줘");
                gardens.get(0).getPot().updateTankLastDate(LocalDateTime.now());


                Notification notification = Notification.builder().user(gardens.get(0).getUser())
                        .garden(gardens.get(0))
                        .pot(gardens.get(0).getPot())
                        .title("물 탱크 부족")
                        .body("응애 물 채워줘")
                        .notificationType(NotificationType.T).build();
                notificationRepository.save(notification);
            }
        }
    }

    /*
    - 이미지 변경 요청시 레벨업이라면? -> 가든 테이블 값 갱신하고 푸쉬알림, 식물 사진 저장
    - 이미지 변경 요청시 레벨업이 아니라면? -? 식물 사진 저장
     */
    @Override
    @Transactional
    public Integer updateLevel(UploadRequestDto uploadRequestDto) throws IOException {
        Garden findGarden = gardenRepository.findGardenByPotId(uploadRequestDto.getPotId()).get(0);

        log.info("레벨업 서비스");
        if (findGarden.getLevel() < uploadRequestDto.getLevel()) { // 레벨업
            //푸시알림
            fcmService.sendPushTo(findGarden.getUser().getId(), "레벨 업", findGarden.getNickname() + "이(가) 레벨업했어요 !");


            //알림 갱신
            Notification notification = Notification.builder()
                    .user(findGarden.getUser())
                    .garden(findGarden)
                    .pot(findGarden.getPot())
                    .title("레벨업")
                    .body(findGarden.getNickname() + "이(가) 레벨업했어요 !")
                    .notificationType(NotificationType.L)
                    .build();
            notificationRepository.save(notification);

            //테이블 갱신

            if (findGarden.getLevel() == 1) {
                findGarden.updateLevel2(uploadRequestDto.getLevel());

            }
            else if (findGarden.getLevel() == 2) {
                findGarden.updateLevel3(uploadRequestDto.getLevel());
            }

            gardenRepository.save(findGarden); // 갱신


            return findGarden.getUser().getId();
        }
        return null;
    }

    //온도 그래프
    @Override
    public List<MeasurementResponseDto> selectValueByPot_id(Integer potId, SensorType sensorType) {
        List<MeasurementResponseDto> result = measurementRepository.selectValueByPot_id(potId, sensorType);
        return result;
    }
}
