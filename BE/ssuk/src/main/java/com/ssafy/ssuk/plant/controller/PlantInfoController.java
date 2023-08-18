package com.ssafy.ssuk.plant.controller;

import com.ssafy.ssuk.exception.dto.CustomException;
import com.ssafy.ssuk.exception.dto.ErrorCode;
import com.ssafy.ssuk.plant.dto.response.ResponseDto;
import com.ssafy.ssuk.plant.dto.response.TotalCategoryResponseDto;
import com.ssafy.ssuk.plant.domain.Info;
import com.ssafy.ssuk.plant.dto.request.InfoRegisterRequestDto;
import com.ssafy.ssuk.plant.dto.response.InfoSearchResponseDto;
import com.ssafy.ssuk.plant.dto.request.InfoUpdateRequestDto;
import com.ssafy.ssuk.plant.service.InfoService;
import com.ssafy.ssuk.plant.domain.Plant;
import com.ssafy.ssuk.plant.domain.Category;
import com.ssafy.ssuk.plant.dto.request.CategoryRegisterRequestDto;
import com.ssafy.ssuk.plant.dto.response.CategorySearchResponseDto;
import com.ssafy.ssuk.plant.dto.request.CategoryUpdateRequestDto;
import com.ssafy.ssuk.plant.dto.request.PlantRegisterRequestDto;
import com.ssafy.ssuk.plant.dto.response.PlantSearchResponseDto;
import com.ssafy.ssuk.plant.dto.request.PlantUpdateRequestDto;
import com.ssafy.ssuk.plant.service.CategoryService;
import com.ssafy.ssuk.plant.service.PlantService;
import com.ssafy.ssuk.utils.response.CommonResponseEntity;
import com.ssafy.ssuk.utils.response.SuccessCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/plantinfo")
@RequiredArgsConstructor
@Slf4j
public class PlantInfoController {

    private final CategoryService plantCategoryService;
    private final PlantService plantService;
    private final InfoService infoService;

    private final String SUCCESS = "OK";
    private final String FAIL = "false";

    @GetMapping("/category")
    public ResponseEntity<CommonResponseEntity> searchCategories() {
        List<CategorySearchResponseDto> collect = plantCategoryService.findPlantCategories()
                .stream()
                .map(pc -> new CategorySearchResponseDto(pc.getName(), pc.getPlants()))
                .collect(Collectors.toList());
        return CommonResponseEntity.getResponseEntity(SuccessCode.SUCCESS_CODE, collect);
    }

    @PostMapping("/category/admin")
    public ResponseEntity<CommonResponseEntity> registerCategory(@RequestBody @Validated CategoryRegisterRequestDto plantCategoryRegisterRequestDto, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            throw new CustomException(ErrorCode.INPUT_EXCEPTION);
        }

        String name = plantCategoryRegisterRequestDto.getCategoryName();
        if(plantCategoryService.isDuplicateName(name)) {
            throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
        }
        plantCategoryService.savePlantCategory(new Category(name));
        return CommonResponseEntity.getResponseEntity(SuccessCode.SUCCESS_CODE);
    }

    @PutMapping("/category/admin")
    public ResponseEntity<CommonResponseEntity> updateCategory(
            @RequestBody @Validated CategoryUpdateRequestDto plantCategoryUpdateRequestDto,
            BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            throw new CustomException(ErrorCode.INPUT_EXCEPTION);
        }


        Integer id = plantCategoryUpdateRequestDto.getCategoryId();
        String updateName = plantCategoryUpdateRequestDto.getUpdateName();

        if (plantCategoryService.isDuplicateName(id, updateName)) {
            throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
        }

        plantCategoryService.modifyPlantCategory(id, updateName);

        return CommonResponseEntity.getResponseEntity(SuccessCode.SUCCESS_CODE);
    }

    @PostMapping("/plant/admin")
    public ResponseEntity<CommonResponseEntity>  registerPlant(
            @RequestBody @Validated PlantRegisterRequestDto plantRegisterRequestDto,
            BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            throw new CustomException(ErrorCode.INPUT_EXCEPTION);
        }

        Category category = plantCategoryService.findOneById(plantRegisterRequestDto.getCategoryId());
        // 이름 중복 검사를 안해도 되나..
        plantService.savePlant(category, plantRegisterRequestDto);
        return CommonResponseEntity.getResponseEntity(SuccessCode.SUCCESS_CODE);
    }

    @GetMapping("/plant/{plantId}")
    public ResponseEntity<CommonResponseEntity> searchPlant(@PathVariable(required = true) Integer plantId) {
        Plant plant = plantService.findOneById(plantId);
        PlantSearchResponseDto returnDto = new PlantSearchResponseDto(plant);
        return CommonResponseEntity.getResponseEntity(SuccessCode.SUCCESS_CODE, returnDto);
    }

    @GetMapping("/plant")
    public ResponseEntity<CommonResponseEntity> searchPlants() {
        List<PlantSearchResponseDto> collect = plantService.findPlants()
                .stream()
                .map(p -> new PlantSearchResponseDto(p))
                .collect(Collectors.toList());
        return CommonResponseEntity.getResponseEntity(SuccessCode.SUCCESS_CODE, collect);
    }

    @PutMapping("/plant/admin")
    public ResponseEntity<CommonResponseEntity> updatePlant(
            @RequestBody @Validated PlantUpdateRequestDto plantUpdateRequestDto,
            BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            throw new CustomException(ErrorCode.INPUT_EXCEPTION);
        }

        Category category = plantCategoryService.findOneById(plantUpdateRequestDto.getCategoryId());

        plantService.modifyPlant(plantUpdateRequestDto, category);

        return CommonResponseEntity.getResponseEntity(SuccessCode.SUCCESS_CODE);
    }

    @GetMapping("/info/{plantId}")
    public ResponseEntity<CommonResponseEntity> searchInfos(@PathVariable(required = true) Integer plantId) {

        Plant plant = plantService.findOneById(plantId);

        List<InfoSearchResponseDto> collect = infoService.findAll(plantId)
                .stream()
                .map(i -> new InfoSearchResponseDto(i))
                .collect(Collectors.toList());
        return CommonResponseEntity.getResponseEntity(SuccessCode.SUCCESS_CODE, collect);
    }

    @GetMapping("/info/{plantId}/{level}")
    public ResponseEntity<CommonResponseEntity> searchInfo(@PathVariable(required = true) Integer plantId, @PathVariable(required = true) Integer level) {

        Plant plant = plantService.findOneById(plantId);

        Info info = infoService.findOne(plantId, level);

        return CommonResponseEntity.getResponseEntity(SuccessCode.SUCCESS_CODE, new InfoSearchResponseDto(info));
    }

    @PostMapping("/info/admin")
    public ResponseEntity<CommonResponseEntity>  registerPlantInfo(
            @RequestBody @Validated InfoRegisterRequestDto infoRegisterRequestDto,
            BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            throw new CustomException(ErrorCode.INPUT_EXCEPTION);
        }

        Integer plantId = infoRegisterRequestDto.getPlantId();
        Integer level = infoRegisterRequestDto.getLevel();

        if (infoService.isDuplicated(plantId, level)) {
            throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
        }

        Plant plant = plantService.findOneById(infoRegisterRequestDto.getPlantId());
        
        infoService.saveInfo(infoRegisterRequestDto, plant);

        return CommonResponseEntity.getResponseEntity(SuccessCode.SUCCESS_CODE);
    }

    @PutMapping("/info/admin")
    public ResponseEntity<CommonResponseEntity> updateInfo(
            @RequestBody @Validated InfoUpdateRequestDto infoUpdateRequestDto,
            BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            throw new CustomException(ErrorCode.INPUT_EXCEPTION);
        }

        infoService.modifyInfo(infoUpdateRequestDto);

        return CommonResponseEntity.getResponseEntity(SuccessCode.SUCCESS_CODE);
    }

    @GetMapping("")
    public ResponseEntity<CommonResponseEntity> searchTotalInfo(@RequestAttribute(required = true) Integer userId) {
        List<TotalCategoryResponseDto> result = plantCategoryService.findTotalInfo(userId);
        return CommonResponseEntity.getResponseEntity(SuccessCode.SUCCESS_CODE, result);
    }

//    @PostMapping("")
//    public ResponseEntity<ResponseDto> searchTotalInfo(@RequestBody @Validated TotalCategoryRequestDto totalCategoryRequestDto,
//                                                       BindingResult bindingResult,
//                                                       @RequestAttribute Integer userId) {
//        if(bindingResult.hasErrors()){
//            return new ResponseEntity<>(new ResponseDto("입력 확인"), HttpStatus.NOT_FOUND);
//        }
//
//        List<TotalCategoryResponseDto> result = plantCategoryService.findTotalInfo(userId);
//        return new ResponseEntity<>(new ResponseDto(SUCCESS, "categories", result), HttpStatus.OK);
//    }
}
