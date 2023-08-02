package com.ssafy.ssuk.user.controller;

import com.ssafy.ssuk.badge.dto.response.UserBadgeResponseDto;
import com.ssafy.ssuk.badge.service.BadgeService;
import com.ssafy.ssuk.collection.service.CollectionService;
import com.ssafy.ssuk.plant.domain.Garden;
import com.ssafy.ssuk.plant.dto.response.ResponseDto;
import com.ssafy.ssuk.plant.service.GardenService;
import com.ssafy.ssuk.user.domain.User;
import com.ssafy.ssuk.user.dto.request.CheckEmailRequestDto;
import com.ssafy.ssuk.user.dto.request.LoginRequestDto;
import com.ssafy.ssuk.user.dto.request.RegisterUserRequestDto;
import com.ssafy.ssuk.user.dto.response.InfoResponseDto;
import com.ssafy.ssuk.user.service.UserService;
import com.ssafy.ssuk.utils.email.EmailMessage;
import com.ssafy.ssuk.utils.jwt.TokenInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
public class UserController {
    private final UserService userService;
    private final EmailMessage emailMessage;
    private final GardenService gardenService;
    private final BadgeService badgeService;
    private final CollectionService collectionService;

    // 회원가입 시 이메일 인증
    @GetMapping("/email")
    public ResponseEntity<?> checkEmail
    (@RequestBody @Validated CheckEmailRequestDto checkEmailRequestDto, BindingResult bindingResult) throws Exception {
        if(bindingResult.hasErrors()){
            return new ResponseEntity<>("Email is empty", HttpStatus.FORBIDDEN);
        }
        Optional<User> findUser = userService.findByEmail(checkEmailRequestDto);
        // 사용자 존재 => 중복 => 가입 안됨
        if (findUser.isPresent()) {
            return new ResponseEntity<>("FALSE", HttpStatus.CONFLICT);
        }
        // 사용자 존재X => 이메일로 인증번호 전송
        String authCode = emailMessage.sendMail(checkEmailRequestDto.getEmail());
//        System.out.println(authCode);
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    // 사용자 등록
    @PostMapping("/join")
    public ResponseEntity<?> registerUser
    (@RequestBody @Validated RegisterUserRequestDto registerUserRequestDto, BindingResult bindingResult) throws Exception {
        if(bindingResult.hasErrors()){
            return new ResponseEntity<>("error", HttpStatus.FORBIDDEN);
        }
        userService.createUser(registerUserRequestDto);
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    // 로그인
    @PostMapping
    public ResponseEntity<?> login(@RequestBody @Validated LoginRequestDto loginRequestDto, BindingResult bindingResult) throws Exception {
        if(bindingResult.hasErrors()){
            return new ResponseEntity<>("error", HttpStatus.FORBIDDEN);
        }
        log.debug("before token");
        TokenInfo tokenInfo = userService.login(loginRequestDto);
        return new ResponseEntity<>(tokenInfo,HttpStatus.OK);
    }

    @GetMapping("/info")
    public ResponseEntity<ResponseDto> searchUserInfo(@RequestAttribute Integer userId) {
        // 닉네임이 토큰에 없다고 가정
//        User user = userService.findById(userId);
//        if(user == null){
//            return new ResponseEntity<>(new ResponseDto("유저가 없어용"), HttpStatus.NOT_FOUND);
//        }

        InfoResponseDto infoResponseDto = new InfoResponseDto();

//        infoResponseDto.setNickname(user.getNickname());
        infoResponseDto.setNickname("security...");

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
