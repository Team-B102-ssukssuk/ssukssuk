package com.ssafy.ssuk.badge.controller;

import com.ssafy.ssuk.badge.dto.request.BadgeRegisterRequestDto;
import com.ssafy.ssuk.badge.dto.request.BadgeUpdateRequestDto;
import com.ssafy.ssuk.badge.dto.response.BadgeSearchResponseDto;
import com.ssafy.ssuk.badge.service.BadgeService;
import com.ssafy.ssuk.plant.dto.response.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/badge")
@RequiredArgsConstructor
@Slf4j
public class BadgeController {

    private final BadgeService badgeService;

    private final String SUCCESS = "OK";
    private final String FAIL = "false";
    private final String INPUT_ERROR = "input error";
    private final String DUPLICATE = "duplicate";

    @GetMapping("")
    public ResponseEntity<ResponseDto> searchBadges() {
        List<BadgeSearchResponseDto> collect = badgeService.findAll();
        return new ResponseEntity<>(new ResponseDto(SUCCESS, "badges", collect), HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/admin")
    public ResponseEntity<ResponseDto> registerBadge(
            @RequestBody @Validated BadgeRegisterRequestDto badgeRegisterRequestDto, BindingResult bindingResult) {

        if(bindingResult.hasErrors()) {
            return new ResponseEntity<>(new ResponseDto(INPUT_ERROR), HttpStatus.BAD_REQUEST);
        }

        if(badgeService.isDuplicated(badgeRegisterRequestDto.getBadgeName())){
            return new ResponseEntity<>(new ResponseDto(DUPLICATE), HttpStatus.CONFLICT);
        }

        badgeService.saveBadge(badgeRegisterRequestDto);

        return new ResponseEntity<>(new ResponseDto(SUCCESS), HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/admin")
    public ResponseEntity<ResponseDto> updateBadge(
            @RequestBody @Validated BadgeUpdateRequestDto badgeUpdateRequestDto, BindingResult bindingResult) {

        if(bindingResult.hasErrors()) {
            return new ResponseEntity<>(new ResponseDto(INPUT_ERROR), HttpStatus.BAD_REQUEST);
        }

        Integer badgeId = badgeUpdateRequestDto.getBadgeId();
        String badgeName = badgeUpdateRequestDto.getBadgeName();
        if(badgeService.isDuplicatedExceptThis(badgeId, badgeName)){
            return new ResponseEntity<>(new ResponseDto(DUPLICATE), HttpStatus.CONFLICT);
        }

        badgeService.modifyBadge(badgeUpdateRequestDto);

        return new ResponseEntity<>(new ResponseDto(SUCCESS), HttpStatus.BAD_REQUEST);
    }
}
