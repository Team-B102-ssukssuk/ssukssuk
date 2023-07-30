package com.ssafy.ssuk.plant.controller;

import com.ssafy.ssuk.plant.domain.Garden;
import com.ssafy.ssuk.plant.domain.Plant;
import com.ssafy.ssuk.plant.dto.request.GardenDeleteRequestDto;
import com.ssafy.ssuk.plant.dto.request.GardenRegisterRequestDto;
import com.ssafy.ssuk.plant.dto.request.GardenRenameRequestDto;
import com.ssafy.ssuk.plant.dto.response.ResponseDto;
import com.ssafy.ssuk.plant.service.GardenService;
import com.ssafy.ssuk.plant.service.PlantService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/plant")
@RequiredArgsConstructor
@Slf4j
public class GardenController {

    private final GardenService gardenService;
    private final PlantService plantService;

    private final String SUCCESS = "OK";
    private final String FAIL = "false";
    @PostMapping("")
    public ResponseEntity<ResponseDto> registerGarden(
            @RequestAttribute Integer userId,
            @RequestBody @Validated GardenRegisterRequestDto gardenRegisterRequestDto,
            BindingResult bindingResult) {
        log.debug("userId={}",userId);

        if(bindingResult.hasErrors())
            return new ResponseEntity<>(new ResponseDto("입력 확인"), HttpStatus.NOT_FOUND);

        // 식물 확인(존재하는지, 이때 카테고리도 같이확인)
        Plant plant = plantService.findOneById(gardenRegisterRequestDto.getPlantId());
        if(plant == null){
            return new ResponseEntity<>(new ResponseDto("존재하지 않는 식물입니다."), HttpStatus.NOT_FOUND);
        } else if(plant.getCategory().getId() != gardenRegisterRequestDto.getCategoryId()){
            return new ResponseEntity<>(new ResponseDto("식물 카테고리가 유효하지 않습니다."), HttpStatus.NOT_FOUND);
        }

        // 유저 확인(이건 믿고 가야하는거 같음, 등록은 자주 일어나지 않으니 확인해도 괜찮으려나)
        // 화분 확인(존재하는지, 소유자가 유저인지)
        // 정원 확인(해당 화분이 사용중인지)
        Garden garden = gardenService.findUsingByPotId(gardenRegisterRequestDto.getPotId());
        if(garden != null){
            return new ResponseEntity<>(new ResponseDto("해당 화분이 이미 사용중입니다."), HttpStatus.CONFLICT);
        }

        String nickname = gardenRegisterRequestDto.getNickname();
        gardenService.save(userId, plant, nickname);
        return new ResponseEntity<>(new ResponseDto(SUCCESS), HttpStatus.OK);
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
}
