package com.ssafy.ssuk.user.controller;

import com.ssafy.ssuk.badge.dto.response.UserBadgeResponseDto;
import com.ssafy.ssuk.badge.service.BadgeService;
import com.ssafy.ssuk.collection.service.CollectionService;
import com.ssafy.ssuk.plant.domain.Garden;
import com.ssafy.ssuk.plant.dto.response.ResponseDto;
import com.ssafy.ssuk.plant.service.GardenService;
import com.ssafy.ssuk.user.domain.User;
import com.ssafy.ssuk.user.dto.request.CheckEmailRequestDto;
import com.ssafy.ssuk.user.dto.request.RegisterUserRequestDto;
import com.ssafy.ssuk.user.dto.response.InfoResponseDto;
import com.ssafy.ssuk.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/user")
@RequiredArgsConstructor    // 변겅
@Slf4j
public class UserController {
    private final UserService userService;
    private final GardenService gardenService;
    private final BadgeService badgeService;
    private final CollectionService collectionService;

//    @Autowired
//    public UserController(UserService userService) {
//        this.userService = userService;
//    }

    // 회원 가입
    @PostMapping("/join")
    public ResponseEntity<ResponseDto> registerUser(@RequestBody @Validated RegisterUserRequestDto registerUserRequestDto) {


        return null;
    }

    // 회원가입 시 이메일 인증
    @GetMapping("/email")
    public ResponseEntity<?> checkEmail(@RequestBody @Validated CheckEmailRequestDto checkEmailRequestDto, BindingResult bindingResult) {
        if(bindingResult.hasErrors()){
            return new ResponseEntity<>("Email is empty", HttpStatus.FORBIDDEN);
        }
        User findUser = userService.findByEmail(checkEmailRequestDto);
        // 해당 이메일을 가진 유저가 있음 => 중복 => 가입 안됨
        if (findUser != null)
            return new ResponseEntity<>("FALSE", HttpStatus.CONFLICT);
        // 해당 이메일을 가진 유저가 없음 => 이메일로 인증번호 전송
        ///////////////////////////구현
        return null;

    }








    @GetMapping("/info")
    public ResponseEntity<ResponseDto> searchUserInfo(@RequestAttribute Integer userId) {
        // 닉네임이 토큰에 없다고 가정
        User user = userService.findById(userId);
        if(user == null){
            return new ResponseEntity<>(new ResponseDto("유저가 없어용"), HttpStatus.NOT_FOUND);
        }

        InfoResponseDto infoResponseDto = new InfoResponseDto();

        infoResponseDto.setNickname(user.getNickname());

        gardenService.findAllByUserId(userId).forEach(g -> {
            if(g.getIsUse()) infoResponseDto.addMyPlantCount();
            else infoResponseDto.addGardenCount();
        });

        List<UserBadgeResponseDto> badges = badgeService.findAllWithUserId(userId);
        infoResponseDto.setBadges(badges);

        int collectionCount = collectionService.findAllByUserId(userId).size();
        infoResponseDto.setCollectionCount(collectionCount);

        return new ResponseEntity<>(new ResponseDto("ok", "information", infoResponseDto), HttpStatus.OK);
    }
}
