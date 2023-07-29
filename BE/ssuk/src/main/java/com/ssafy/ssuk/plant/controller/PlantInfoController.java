package com.ssafy.ssuk.plant.controller;

import com.ssafy.ssuk.plant.category.PlantCategory;
import com.ssafy.ssuk.plant.category.dto.PlantCategoryRegisterRequestDto;
import com.ssafy.ssuk.plant.category.dto.PlantCategoryRegisterResponseDto;
import com.ssafy.ssuk.plant.category.dto.PlantCategorySearchResponseDto;
import com.ssafy.ssuk.plant.category.dto.PlantCategoryUpdateRequestDto;
import com.ssafy.ssuk.plant.dto.*;
import com.ssafy.ssuk.plant.category.service.PlantCategoryService;
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
@RequestMapping("plantinfo")
@RequiredArgsConstructor
@Slf4j
public class PlantInfoController {

    private final PlantCategoryService plantCategoryService;
    private final PlantService plantService;

    private final String SUCCESS = "OK";
    private final String FAIL = "false";

    @GetMapping("/category/admin")
    public ResponseEntity<ResponseDto> searchCategories() {
        List<PlantCategorySearchResponseDto> collect = plantCategoryService.findPlantCategories()
                .stream()
                .map(pc -> new PlantCategorySearchResponseDto(pc.getId(), pc.getName()))
                .collect(Collectors.toList());
        ResponseDto responseDto = new ResponseDto(SUCCESS);
        responseDto.getData().put("categories", collect);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @PostMapping("/category/admin")
    public ResponseEntity<PlantCategoryRegisterResponseDto> registerCategory(@RequestBody @Validated PlantCategoryRegisterRequestDto plantCategoryRegisterRequestDto, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            return new ResponseEntity<>(new PlantCategoryRegisterResponseDto(FAIL), HttpStatus.CONFLICT);   // 수정해야함 코드
        }

        String name = plantCategoryRegisterRequestDto.getCategoryName();
        log.debug("name={}", name);
        if(plantCategoryService.isDuplicateName(name)) {
            return new ResponseEntity<>(new PlantCategoryRegisterResponseDto(FAIL), HttpStatus.CONFLICT);   // 수정해야함 코드
        }
        plantCategoryService.savePlantCategory(new PlantCategory(name));
        return new ResponseEntity<>(new PlantCategoryRegisterResponseDto(SUCCESS), HttpStatus.OK);
    }

    @PutMapping("/category/admin")
    public ResponseEntity<ResponseDto> updateCategory(
            @RequestBody @Validated PlantCategoryUpdateRequestDto plantCategoryUpdateRequestDto,
            BindingResult bindingResult) {

        if(bindingResult.hasErrors())
            return new ResponseEntity<>(new ResponseDto(FAIL), HttpStatus.NOT_FOUND);

        Integer id = plantCategoryUpdateRequestDto.getCategoryId();
        String updateName = plantCategoryUpdateRequestDto.getUpdateName();

        if(plantCategoryService.isDuplicateName(id, updateName))
            return new ResponseEntity<>(new ResponseDto(FAIL), HttpStatus.CONFLICT);

        plantCategoryService.updatePlantCategory(id, updateName);

        return new ResponseEntity<>(new ResponseDto(SUCCESS), HttpStatus.OK);
    }

    @PostMapping("/plant/admin")
    public ResponseEntity<ResponseDto>  registerPlant(
            @RequestBody @Validated PlantRegisterRequestDto plantRegisterRequestDto,
            BindingResult bindingResult){
        if(bindingResult.hasErrors())
            return new ResponseEntity<>(new ResponseDto(FAIL), HttpStatus.NOT_FOUND);

        PlantCategory category = plantCategoryService.findOneById(plantRegisterRequestDto.getCategoryId());
        if(category == null)
            return new ResponseEntity<>(new ResponseDto(FAIL), HttpStatus.NOT_FOUND);
        // 이름 중복 검사를 안해도 되나..
        plantService.savePlant(category, plantRegisterRequestDto);
        return new ResponseEntity<>(new ResponseDto(SUCCESS), HttpStatus.OK);
    }
}
