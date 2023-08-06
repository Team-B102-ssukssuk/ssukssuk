package com.ssafy.ssuk.plant.controller;

import com.ssafy.ssuk.exception.dto.CustomException;
import com.ssafy.ssuk.exception.dto.ErrorCode;
import com.ssafy.ssuk.plant.domain.Garden;
import com.ssafy.ssuk.plant.domain.Plant;
import com.ssafy.ssuk.plant.dto.request.GardenDeleteRequestDto;
import com.ssafy.ssuk.plant.dto.request.GardenRegisterRequestDto;
import com.ssafy.ssuk.plant.dto.request.GardenRenameRequestDto;
import com.ssafy.ssuk.plant.dto.response.GardenSearchOneResponseDto;
import com.ssafy.ssuk.plant.dto.response.ResponseDto;
import com.ssafy.ssuk.plant.service.GardenService;
import com.ssafy.ssuk.plant.service.PlantService;
import com.ssafy.ssuk.pot.domain.Pot;
import com.ssafy.ssuk.pot.repository.PotRepository;
import com.ssafy.ssuk.pot.service.PotService;
import com.ssafy.ssuk.user.domain.User;
import com.ssafy.ssuk.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.lang.annotation.Repeatable;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/plant")
@RequiredArgsConstructor
@DynamicInsert
@Slf4j
public class GardenController {

    private final GardenService gardenService;
    private final PlantService plantService;
    private final PotRepository potRepository;
    private final UserRepository userRepository;

    private final String SUCCESS = "OK";
    private final String FAIL = "false";
    @PostMapping("")
    public ResponseEntity<ResponseDto> registerGarden(
            @RequestAttribute(required = true) Integer userId,
            @RequestBody @Validated GardenRegisterRequestDto gardenRegisterRequestDto,
            BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            throw new CustomException(ErrorCode.INPUT_EXCEPTION);
        }

        // 식물 확인(존재하는지)
        Plant plant = plantService.findOneById(gardenRegisterRequestDto.getPlantId());

        // 유저 확인(이건 믿고 가야하는거 같음, 등록은 자주 일어나지 않으니 확인해도 괜찮으려나)
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        // 화분 확인(존재하는지, 소유자가 유저인지)
        Pot pot = potRepository.findById(gardenRegisterRequestDto.getPotId()).orElseThrow(() -> new CustomException(ErrorCode.POT_NOT_FOUND));
        /** 이부분 쿼리 또 발생함
         * 아닌가 발생안할지도.. user가 일치하면 안할거같기도한데
         * 얘기해봐야함
         */
        if (pot.getUser() == null || user.getId() != pot.getUser().getId()) {
            throw new CustomException(ErrorCode.POT_NOT_MATCH_USER);
        }

        // 정원 확인(해당 화분이 사용중인지)
        Garden garden = gardenService.findUsingByPotId(gardenRegisterRequestDto.getPotId());
        if(garden != null){
            return new ResponseEntity<>(new ResponseDto("해당 화분이 이미 사용중입니다."), HttpStatus.CONFLICT);
        }

        String nickname = gardenRegisterRequestDto.getNickname();
        Garden newGarden = gardenService.save(userId, plant, pot, nickname);

        /**
         * user의 plantcount 늘리는 메소드 추가해야함
         * user.plusPlantCount()
         */

        return new ResponseEntity<>(new ResponseDto(SUCCESS, "gardenId", newGarden.getId()), HttpStatus.OK);
    }

    @PutMapping("")
    public ResponseEntity<ResponseDto> renameGarden(
            @RequestAttribute Integer userId,
            @RequestBody @Validated GardenRenameRequestDto gardenRenameRequestDto,
            BindingResult bindingResult) {

        if(bindingResult.hasErrors())
            return new ResponseEntity<>(new ResponseDto("입력 확인"), HttpStatus.NOT_FOUND);


        // 유저 확인(이건 믿고 가야하는거 같음, 수정도 자주 일어나지 않으니 확인해도 괜찮으려나)
        // 정원 확인(service에서 진행)
        Integer gardenId = gardenRenameRequestDto.getGardenId();
        String nickname = gardenRenameRequestDto.getNickname();
        if(gardenService.renameGarden(gardenId, userId, nickname)) {
            return new ResponseEntity<>(new ResponseDto(SUCCESS), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ResponseDto(FAIL), HttpStatus.NOT_FOUND);
    }

    @PutMapping("/kill")
    public ResponseEntity<ResponseDto> unUseGarden(
            @RequestAttribute Integer userId,
            @RequestBody @Validated GardenDeleteRequestDto gardenDeleteRequestDto,
            BindingResult bindingResult) {

        if(bindingResult.hasErrors())
            return new ResponseEntity<>(new ResponseDto("입력 확인"), HttpStatus.NOT_FOUND);


        // 유저 확인(이건 믿고 가야하는거 같음, 삭제는 더더욱 자주 일어나지 않으니 확인해도 괜찮으려나)
        // 정원 확인(service에서 진행)

        Integer gardenId = gardenDeleteRequestDto.getGardenId();
        if(gardenService.deleteGarden(userId, gardenId)) {
            return new ResponseEntity<>(new ResponseDto(SUCCESS), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ResponseDto(FAIL), HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{gardenId}")
    public ResponseEntity<ResponseDto> searchOneNow(@PathVariable(required = true) Integer gardenId, @RequestAttribute Integer userId) {
        Garden garden = gardenService.findOndByIdAndUserId(gardenId, userId);
        if(garden == null)
            return new ResponseEntity<>(new ResponseDto(FAIL), HttpStatus.OK);
        return new ResponseEntity<>(new ResponseDto(SUCCESS, "garden", new GardenSearchOneResponseDto(garden)), HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<ResponseDto> searchAllNow(@RequestAttribute(required = true) Integer userId) {
        List<GardenSearchOneResponseDto> collect = gardenService.findAllByUserId(userId, true).stream().map(g -> new GardenSearchOneResponseDto(g)).collect(Collectors.toList());
        return new ResponseEntity<>(new ResponseDto(SUCCESS, "gardens", collect), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<ResponseDto> searchAll(@RequestAttribute(required = true) Integer userId) {
        List<GardenSearchOneResponseDto> collect = gardenService.findAllByUserId(userId).stream().map(g -> new GardenSearchOneResponseDto(g)).collect(Collectors.toList());
        return new ResponseEntity<>(new ResponseDto(SUCCESS, "gardens", collect), HttpStatus.OK);
    }

    @PutMapping("/delete/{gardenId}")
    public ResponseEntity<ResponseDto> deleteFromGarden(
            @RequestAttribute(required = true) Integer userId,
            @PathVariable Integer gardenId) {
        gardenService.deleteFromGarden(gardenId);
        return new ResponseEntity<>(new ResponseDto(SUCCESS), HttpStatus.OK);
    }
}
