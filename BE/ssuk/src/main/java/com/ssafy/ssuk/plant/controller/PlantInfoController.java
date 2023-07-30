package com.ssafy.ssuk.plant.controller;

import com.ssafy.ssuk.plant.dto.response.ResponseDto;
import com.ssafy.ssuk.plant.dto.request.TotalCategoryRequestDto;
import com.ssafy.ssuk.plant.dto.response.TotalCategoryResponseDto;
import com.ssafy.ssuk.plant.domain.Info;
import com.ssafy.ssuk.plant.dto.request.InfoRegisterRequestDto;
import com.ssafy.ssuk.plant.dto.Response.InfoSearchResponseDto;
import com.ssafy.ssuk.plant.dto.request.InfoUpdateRequestDto;
import com.ssafy.ssuk.plant.service.InfoService;
import com.ssafy.ssuk.plant.domain.Plant;
import com.ssafy.ssuk.plant.domain.Category;
import com.ssafy.ssuk.plant.dto.request.CategoryRegisterRequestDto;
import com.ssafy.ssuk.plant.dto.response.CategorySearchResponseDto;
import com.ssafy.ssuk.plant.dto.request.CategoryUpdateRequestDto;
import com.ssafy.ssuk.plant.dto.request.PlantRegisterRequestDto;
import com.ssafy.ssuk.plant.dto.Response.PlantSearchResponseDto;
import com.ssafy.ssuk.plant.dto.request.PlantUpdateRequestDto;
import com.ssafy.ssuk.plant.service.CategoryService;
import com.ssafy.ssuk.plant.service.PlantService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
    public ResponseEntity<ResponseDto> searchCategories() {
        List<CategorySearchResponseDto> collect = plantCategoryService.findPlantCategories()
                .stream()
                .map(pc -> new CategorySearchResponseDto(pc.getId(), pc.getName()))
                .collect(Collectors.toList());
        return new ResponseEntity<>(new ResponseDto(SUCCESS, "categories", collect), HttpStatus.OK);
    }

    @PostMapping("/category/admin")
    public ResponseEntity<ResponseDto> registerCategory(@RequestBody @Validated CategoryRegisterRequestDto plantCategoryRegisterRequestDto, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            return new ResponseEntity<>(new ResponseDto("입력 확인"), HttpStatus.CONFLICT);   // 수정해야함 코드
        }

        String name = plantCategoryRegisterRequestDto.getCategoryName();
        log.debug("name={}", name);
        if(plantCategoryService.isDuplicateName(name)) {
            return new ResponseEntity<>(new ResponseDto(FAIL), HttpStatus.CONFLICT);   // 수정해야함 코드
        }
        plantCategoryService.savePlantCategory(new Category(name));
        return new ResponseEntity<>(new ResponseDto(SUCCESS), HttpStatus.OK);
    }

    @PutMapping("/category/admin")
    public ResponseEntity<ResponseDto> updateCategory(
            @RequestBody @Validated CategoryUpdateRequestDto plantCategoryUpdateRequestDto,
            BindingResult bindingResult) {

        if(bindingResult.hasErrors())
            return new ResponseEntity<>(new ResponseDto("입력 확인"), HttpStatus.NOT_FOUND);

        Integer id = plantCategoryUpdateRequestDto.getCategoryId();
        String updateName = plantCategoryUpdateRequestDto.getUpdateName();

        if(plantCategoryService.isDuplicateName(id, updateName))
            return new ResponseEntity<>(new ResponseDto(FAIL), HttpStatus.CONFLICT);

        plantCategoryService.modifyPlantCategory(id, updateName);

        return new ResponseEntity<>(new ResponseDto(SUCCESS), HttpStatus.OK);
    }

    @PostMapping("/plant/admin")
    public ResponseEntity<ResponseDto>  registerPlant(
            @RequestBody @Validated PlantRegisterRequestDto plantRegisterRequestDto,
            BindingResult bindingResult){
        if(bindingResult.hasErrors())
            return new ResponseEntity<>(new ResponseDto("입력 확인"), HttpStatus.NOT_FOUND);

        Category category = plantCategoryService.findOneById(plantRegisterRequestDto.getCategoryId());
        if(category == null)
            return new ResponseEntity<>(new ResponseDto(FAIL), HttpStatus.NOT_FOUND);
        // 이름 중복 검사를 안해도 되나..
        plantService.savePlant(category, plantRegisterRequestDto);
        return new ResponseEntity<>(new ResponseDto(SUCCESS), HttpStatus.OK);
    }

    @GetMapping("/plant/{plantId}")
    public ResponseEntity<ResponseDto> searchPlant(@PathVariable(required = true) Integer plantId) {
        // 필요없을듯?
//        if(plantId == null)
//            return new ResponseEntity<>(new ResponseDto(FAIL), HttpStatus.NOT_FOUND);

        Plant plant = plantService.findOneById(plantId);
        if(plant == null)
            return new ResponseEntity<>(new ResponseDto(FAIL), HttpStatus.NOT_FOUND);
        PlantSearchResponseDto returnDto = new PlantSearchResponseDto(plant);
        return new ResponseEntity<>(new ResponseDto(SUCCESS, "plant", returnDto), HttpStatus.OK);
    }

    @GetMapping("/plant")
    public ResponseEntity<ResponseDto> searchPlants() {
        List<PlantSearchResponseDto> collect = plantService.findPlants()
                .stream()
                .map(p -> new PlantSearchResponseDto(p))
                .collect(Collectors.toList());
        return new ResponseEntity<>(new ResponseDto(SUCCESS, "plants", collect), HttpStatus.OK);
    }

    @PutMapping("/plant/admin")
    public ResponseEntity<ResponseDto> updatePlant(
            @RequestBody @Validated PlantUpdateRequestDto plantUpdateRequestDto,
            BindingResult bindingResult) {

        if(bindingResult.hasErrors())
            return new ResponseEntity<>(new ResponseDto("입력 확인"), HttpStatus.NOT_FOUND);

        Category category = plantCategoryService.findOneById(plantUpdateRequestDto.getCategoryId());

        if(category == null)
            return new ResponseEntity<>(new ResponseDto("존재하지 않는 카테고리입니다."), HttpStatus.CONFLICT);

        if(plantService.modifyPlant(plantUpdateRequestDto, category))
            return new ResponseEntity<>(new ResponseDto(SUCCESS), HttpStatus.OK);

        return new ResponseEntity<>(new ResponseDto("존재하지 않는 식물입니다."), HttpStatus.NOT_FOUND);
    }

    @GetMapping("/info/{plantId}")
    public ResponseEntity<ResponseDto> searchInfos(@PathVariable(required = true) Integer plantId) {
        // 필요없을듯?
//        if(plantId == null)
//            return new ResponseEntity<>(new ResponseDto(FAIL), HttpStatus.NOT_FOUND);

        Plant plant = plantService.findOneById(plantId);
        if(plant == null)
            return new ResponseEntity<>(new ResponseDto(FAIL), HttpStatus.NOT_FOUND);
        List<InfoSearchResponseDto> collect = infoService.findAll(plantId)
                .stream()
                .map(i -> new InfoSearchResponseDto(i))
                .collect(Collectors.toList());
        return new ResponseEntity<>(new ResponseDto(SUCCESS, "plantInfos", collect), HttpStatus.OK);
    }

    @GetMapping("/info/{plantId}/{level}")
    public ResponseEntity<ResponseDto> searchInfo(@PathVariable(required = true) Integer plantId, @PathVariable(required = true) Integer level) {
        // 필요없을듯?
//        if(plantId == null)
//            return new ResponseEntity<>(new ResponseDto(FAIL), HttpStatus.NOT_FOUND);

        Plant plant = plantService.findOneById(plantId);
        if(plant == null)
            return new ResponseEntity<>(new ResponseDto(FAIL), HttpStatus.NOT_FOUND);
        Info info = infoService.findOne(plantId, level);
        if(info == null)
            return new ResponseEntity<>(new ResponseDto(SUCCESS, "plantInfo", null), HttpStatus.OK);
        return new ResponseEntity<>(new ResponseDto(SUCCESS, "plantInfo", new InfoSearchResponseDto(info)), HttpStatus.OK);
    }

    @PostMapping("/info/admin")
    public ResponseEntity<ResponseDto>  registerPlantInfo(
            @RequestBody @Validated InfoRegisterRequestDto infoRegisterRequestDto,
            BindingResult bindingResult){
        if(bindingResult.hasErrors())
            return new ResponseEntity<>(new ResponseDto("입력 확인"), HttpStatus.NOT_FOUND);


        Integer plantId = infoRegisterRequestDto.getPlantId();
        Integer level = infoRegisterRequestDto.getLevel();


        Plant plant = plantService.findOneById(plantId);
        if(plant == null) {
            return new ResponseEntity<>(new ResponseDto(FAIL), HttpStatus.NOT_FOUND);
        }

        if(infoService.isDuplicated(plantId, level)){
            return new ResponseEntity<>(new ResponseDto(FAIL), HttpStatus.CONFLICT);
        }

        infoService.saveInfo(infoRegisterRequestDto, plant);
        return new ResponseEntity<>(new ResponseDto(SUCCESS), HttpStatus.OK);
    }

    @PutMapping("/info/admin")
    public ResponseEntity<ResponseDto> updateInfo(
            @RequestBody @Validated InfoUpdateRequestDto infoUpdateRequestDto,
            BindingResult bindingResult) {

        if(bindingResult.hasErrors())
            return new ResponseEntity<>(new ResponseDto("입력 확인"), HttpStatus.NOT_FOUND);

        if(infoService.modifyInfo(infoUpdateRequestDto))
            return new ResponseEntity<>(new ResponseDto(SUCCESS), HttpStatus.OK);

        return new ResponseEntity<>(new ResponseDto(FAIL), HttpStatus.NOT_FOUND);
    }

    @GetMapping("")
    public ResponseEntity<ResponseDto> searchTotalInfo() {
        List<TotalCategoryResponseDto> result = plantCategoryService.findTotalInfo();
        return new ResponseEntity<>(new ResponseDto(SUCCESS, "categories", result), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<ResponseDto> searchTotalInfo(@RequestBody @Validated TotalCategoryRequestDto totalCategoryRequestDto, BindingResult bindingResult) {
        if(bindingResult.hasErrors()){
            return new ResponseEntity<>(new ResponseDto("입력 확인"), HttpStatus.NOT_FOUND);
        }

        List<TotalCategoryResponseDto> result = plantCategoryService.findTotalInfo(totalCategoryRequestDto.getCategoryIds());
        return new ResponseEntity<>(new ResponseDto(SUCCESS, "categories", result), HttpStatus.OK);
    }
}
