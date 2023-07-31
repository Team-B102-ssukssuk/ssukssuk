package com.ssafy.ssuk.badge.controller;

import com.ssafy.ssuk.badge.dto.request.BadgeRegisterRequestDto;
import com.ssafy.ssuk.badge.service.BadgeService;
import com.ssafy.ssuk.plant.dto.response.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/badge")
@RequiredArgsConstructor
@Slf4j
public class BadgeController {

    private final BadgeService badgeService;

    private final String SUCCESS = "OK";
    private final String FAIL = "false";

//    @PostMapping("/admin")
//    public ResponseEntity<ResponseDto> registerBadge(
//            @RequestBody @Validated BadgeRegisterRequestDto badgeRegisterRequestDto, BindingResult bindingResult) {
//
//        if(bindingResult.hasErrors()) {
//            return new ResponseEntity<>(new ResponseDto(FAIL), HttpStatus.BAD_REQUEST);
//        }
//
//        badgeService.saveBadge(badgeRegisterRequestDto);
//
//        return new ResponseEntity<>(new ResponseDto(SUCCESS), HttpStatus.BAD_REQUEST);
//    }
}
