package com.ssafy.ssuk.measurement.service;

import com.ssafy.ssuk.collection.service.CollectionService;
import com.ssafy.ssuk.exception.dto.CustomException;
import com.ssafy.ssuk.exception.dto.ErrorCode;
import com.ssafy.ssuk.measurement.domain.Measurement;
import com.ssafy.ssuk.measurement.domain.SensorType;
import com.ssafy.ssuk.measurement.dto.request.UploadRequestDto;
import com.ssafy.ssuk.measurement.dto.response.GroundResponseDto;
import com.ssafy.ssuk.measurement.dto.response.MeasurementResponseDto;
import com.ssafy.ssuk.measurement.dto.response.RecentMeasurementResponseDto;
import com.ssafy.ssuk.measurement.dto.socket.SensorMessageDto;
import com.ssafy.ssuk.measurement.repository.MeasurementRepository;
import com.ssafy.ssuk.notify.domain.Notification;
import com.ssafy.ssuk.notify.domain.NotificationType;
import com.ssafy.ssuk.notify.repository.NotificationRepository;
import com.ssafy.ssuk.notify.service.FcmService;
import com.ssafy.ssuk.plant.domain.Garden;
import com.ssafy.ssuk.plant.repository.domain.GardenRepository;
import com.ssafy.ssuk.pot.domain.Pot;
import com.ssafy.ssuk.user.domain.User;
import com.ssafy.ssuk.utils.image.ImageInfo;
import com.ssafy.ssuk.utils.image.S3UploadService;
import com.ssafy.ssuk.utils.response.CommonResponseEntity;
import com.ssafy.ssuk.utils.response.SuccessCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class MeasurementServiceImpl implements MeasurementService {
    private final MeasurementRepository measurementRepository;
    private final GardenRepository gardenRepository;
    private final FcmService fcmService;
    private final NotificationRepository notificationRepository;
    private final S3UploadService s3UploadService;
    private final CollectionService collectionService;

    @Override
    public List<RecentMeasurementResponseDto> findRecentValueByPot_Id(Integer user_id, Integer pot_id) {
        // 해당 유저가 화분을 보유하고 있는지 체킹을 할까? 고려해보자
        List<Measurement> result = measurementRepository.findRecentValueByPot_Id(pot_id);

        if (result.size() == 0) {
            result.add(new Measurement(0, new Pot(pot_id), 0.0, LocalDate.now(), SensorType.T));
            result.add(new Measurement(0, new Pot(pot_id), 100.0, LocalDate.now(), SensorType.W));
            result.add(new Measurement(0, new Pot(pot_id), 0.0, LocalDate.now(), SensorType.M));
            result.add(new Measurement(0, new Pot(pot_id), 0.0, LocalDate.now(), SensorType.H));
        }
        List<RecentMeasurementResponseDto> collect = result.
                stream()
                .map(m -> new RecentMeasurementResponseDto(m.getId(), m.getMeasurementValue(), m.getMeasurementTime(), m.getSensorType()))
                .collect(Collectors.toList());
        //화분아이디로 센서값 뱉기
        return collect;
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
        Garden garden = Optional.ofNullable(gardenRepository.findGardenByPotId(sensorMessageDto.getPotId()))
                .orElseThrow(() -> new CustomException(ErrorCode.GARDEN_NOT_FOUND));
        Integer userId = garden.getUser().getId();

        if (sensorMessageDto.getSensorType().equals(SensorType.M)) {
            if (garden.getPlant().getMoistureMin() < sensorMessageDto.getMeasurementValue()) {

                String nickName = garden.getNickname();

                log.info("물이 없네요 선생님");

                LocalDateTime lastTime = garden.getPot().getMoistureLastDate();
                //push 알림
                if (lastTime.plusMinutes(30).isBefore(LocalDateTime.now())) {
                    log.info("물 부족 푸쉬 전송");
                    fcmService.sendPushTo(userId, "물 부족", nickName + "이(가) 물이 부족해요");
                    garden.getPot().updateMoistueLastDate(LocalDateTime.now());


                    //알림 테이블 저장
                    Notification notification = Notification.builder().user(garden.getUser())
                            .garden(garden)
                            .pot(garden.getPot())
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

            LocalDateTime lastTime = garden.getPot().getTankLastDate();
            if (lastTime.plusMinutes(30).isBefore(LocalDateTime.now())) {
                log.info("물탱크 푸쉬 전송");
                fcmService.sendPushTo(userId, "물탱크 물 부족", "응애 물 채워줘");
                garden.getPot().updateTankLastDate(LocalDateTime.now());


                Notification notification = Notification.builder().user(garden.getUser())
                        .garden(garden)
                        .pot(garden.getPot())
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
    public Integer updateLevel(UploadRequestDto uploadRequestDto) {
        Garden findGarden = Optional.ofNullable(gardenRepository.findGardenByPotId(uploadRequestDto.getPotId()))
                .orElseThrow(() -> new CustomException(ErrorCode.GARDEN_NOT_FOUND));

        log.info("레벨업 서비스ttttttt");
        Integer level = uploadRequestDto.getLevel();
        if (!(level == 1 && findGarden.getLevel() == 1) && level - findGarden.getLevel() != 1) {
            throw new CustomException(ErrorCode.INPUT_EXCEPTION);
        }
        if (findGarden.getLevel() < level && level <= 3) { // 레벨업
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
                    .level(findGarden.getLevel() + 1)
                    .build();
            notificationRepository.save(notification);

            //테이블 갱신

            log.debug("이미지를 추출할거야!!");
            ImageInfo imageInfo = null;
            try {
                imageInfo = s3UploadService.uploadPlant(uploadRequestDto.getFile());
                log.debug("imageInfo.getImageName()={}", imageInfo.getImageName());
                findGarden.updateImage(level, imageInfo.getImageName());
            } catch (IOException e) {
                log.debug("2 또는 3단계 사진 업로드 실패...");
            }
            if (findGarden.getLevel() <= 2) {
                if (findGarden.getLevel() == 1) {
                    findGarden.updateLevel2();
                } else if (findGarden.getLevel() == 2) {
                    findGarden.updateLevel3();
                }
                if (!collectionService.checkExists(findGarden.getUser().getId(), findGarden.getPlant().getId(), level)) {
                    // 없으면 등록 있으면 아무것도 안함
                    collectionService.save(findGarden.getUser().getId(), findGarden.getPlant().getId(), level);
                }
            }

            gardenRepository.save(findGarden); // 갱신

            return findGarden.getUser().getId();
        } else if (level == 1 && findGarden.getFirstImage() == null) {
            ImageInfo imageInfo = null;
            try {
                imageInfo = s3UploadService.uploadPlant(uploadRequestDto.getFile());
                findGarden.updateImage(level, imageInfo.getImageName());
            } catch (IOException e) {
                log.debug("1단계 사진 업로드 실패...");
            }
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

    @Override
    public List<GroundResponseDto> selectGroundByPot_Id(Integer potId, SensorType sensorType) {
        List<GroundResponseDto> result = measurementRepository.selectGroundByPot_id(potId, sensorType);

        return result;
    }
}
