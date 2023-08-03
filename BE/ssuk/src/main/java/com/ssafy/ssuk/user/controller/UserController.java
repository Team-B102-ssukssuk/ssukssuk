package com.ssafy.ssuk.user.controller;

import com.ssafy.ssuk.badge.dto.response.UserBadgeResponseDto;
import com.ssafy.ssuk.badge.service.BadgeService;
import com.ssafy.ssuk.collection.service.CollectionService;
import com.ssafy.ssuk.exception.dto.CustomException;
import com.ssafy.ssuk.exception.dto.ErrorCode;
import com.ssafy.ssuk.plant.domain.Garden;
import com.ssafy.ssuk.plant.dto.response.ResponseDto;
import com.ssafy.ssuk.plant.service.GardenService;
import com.ssafy.ssuk.redis.service.RedisService;
import com.ssafy.ssuk.user.domain.User;
import com.ssafy.ssuk.user.dto.request.*;
import com.ssafy.ssuk.user.dto.response.InfoResponseDto;
import com.ssafy.ssuk.user.service.UserService;
import com.ssafy.ssuk.utils.email.EmailMessage;
import com.ssafy.ssuk.utils.jwt.TokenInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
public class UserController {
    private final UserService userService;
    private final EmailMessage emailMessage;
    private final GardenService gardenService;
    private final BadgeService badgeService;
    private final CollectionService collectionService;
    private final RedisService redisService;

    // 회원가입시 이메일 인증코드 발송
    @PostMapping("/join/email")
    public ResponseEntity<?> sendEmailCode
            (@RequestBody @Validated CheckEmailRequestDto checkEmailRequestDto, BindingResult bindingResult) throws Exception {
        if(bindingResult.hasErrors()){
            return new ResponseEntity<>("요청값 검증 실패", HttpStatus.FORBIDDEN);
        }
        Optional<User> findUser = userService.findByEmail(checkEmailRequestDto);
        // 사용자 존재 => 중복 => 가입 안됨
        if (findUser.isPresent()) {
            throw new CustomException(ErrorCode.DUPLICATE_USER_EMAIL);
//            return new ResponseEntity<>("중복된 이메일", HttpStatus.CONFLICT);
        }
        // 사용자 존재X => 이메일로 인증코드 발송
        String userEmail = checkEmailRequestDto.getEmail();
        String authCode = emailMessage.sendMail(userEmail);
//        log.debug("userEmail={}",userEmail);
//        log.debug("authCode={}",authCode);
        // 인증코드 Redis 서버에 저장
        redisService.setEmailCode(userEmail, authCode);
        return new ResponseEntity<>("인증코드 발송 완료", HttpStatus.OK);
    }

    // 회원가입시 이메일 인증코드 확인
    @PostMapping("/join/emailcheck")
    public ResponseEntity<?> verifyEmailCode
            (@RequestBody @Validated VerifyEmailCodeDto verifyEmailCodeDto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>("요청값 검증 실패", HttpStatus.FORBIDDEN);
        }
        String userEmail = verifyEmailCodeDto.getEmail();
        String entryCode = verifyEmailCodeDto.getCode();
        String authCode = redisService.getEmailCode(userEmail);
        log.debug("userEmail={}",userEmail);
        log.debug("entryCode={}",entryCode);
        log.debug("authCode={}",authCode);
        if (entryCode.equals(authCode))
            return new ResponseEntity<>("인증코드 일치", HttpStatus.OK);
        return new ResponseEntity<>("인증코드 불일치", HttpStatus.NOT_FOUND);
    }

    // 닉네임 중복 확인
    @GetMapping("/nickname/{nickname}")
    public ResponseEntity<?> verifyNickname(@PathVariable String nickname) {
        log.debug("nickname={}",nickname);
        Optional<User> findUser = userService.findByNickname(nickname);
        if (findUser.isPresent())
            throw new CustomException(ErrorCode.DUPLICATE_USER_NICKNAME);
//            return new ResponseEntity<>("중복된 닉네임", HttpStatus.CONFLICT);
        return new ResponseEntity<>("사용 가능한 닉네임", HttpStatus.OK);
    }

    // 회원가입
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
        String userEmail = loginRequestDto.getEmail();
        String refreshToken = tokenInfo.getRefreshToken();
        // refreshToken Redis 서버에 저장
        redisService.setRefreshToken(userEmail, refreshToken);
        String token = redisService.getRefreshToken(userEmail);
        log.debug("token={}",token);
        return new ResponseEntity<>(tokenInfo,HttpStatus.OK);
    }

    @GetMapping("/info")
    public ResponseEntity<ResponseDto> searchUserInfo(@RequestAttribute Integer userId, @RequestAttribute String userNickname) {
        // 닉네임이 토큰에 없다고 가정
//        User user = userService.findById(userId);
//        if(user == null){
//            return new ResponseEntity<>(new ResponseDto("유저가 없어용"), HttpStatus.NOT_FOUND);
//        }

        InfoResponseDto infoResponseDto = new InfoResponseDto();

        infoResponseDto.setNickname(userNickname);

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

    // 비밀번호 재설정시 이메일 인증코드 발송
    @PostMapping("/password/email")
    public ResponseEntity<?> sendPasswordEmailCode
    (@RequestBody @Validated CheckEmailRequestDto checkEmailRequestDto, BindingResult bindingResult) throws Exception {
        if(bindingResult.hasErrors()){
            return new ResponseEntity<>("요청값 검증 실패", HttpStatus.FORBIDDEN);
        }
        Optional<User> findUser = userService.findByEmail(checkEmailRequestDto);
        if (!findUser.isPresent()) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        String userEmail = checkEmailRequestDto.getEmail();
        String authCode = emailMessage.sendMail(userEmail);
        // 인증코드 Redis 서버에 저장
        redisService.setEmailCode(userEmail, authCode);
        return new ResponseEntity<>("인증코드 발송 완료", HttpStatus.OK);
    }

    // 비밀번호 재설정시 이메일 인증코드 확인
    @PostMapping("/password/emailcheck")
    public ResponseEntity<?> verifyPasswordEmailCode
    (@RequestBody @Validated VerifyEmailCodeDto verifyEmailCodeDto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>("요청값 검증 실패", HttpStatus.FORBIDDEN);
        }
        String userEmail = verifyEmailCodeDto.getEmail();
        String entryCode = verifyEmailCodeDto.getCode();
        String authCode = redisService.getEmailCode(userEmail);
        log.debug("userEmail={}",userEmail);
        log.debug("entryCode={}",entryCode);
        log.debug("authCode={}",authCode);
        if (entryCode.equals(authCode))
            return new ResponseEntity<>("인증코드 일치", HttpStatus.OK);
        return new ResponseEntity<>("인증코드 불일치", HttpStatus.NOT_FOUND);
    }

    // 비밀번호 재설정
    @PutMapping("/password")
    public ResponseEntity<?> updatePassword
    (@RequestBody @Validated UpdatePasswordDto updatePasswordDto, BindingResult bindingResult) throws Exception {
        if(bindingResult.hasErrors()){
            return new ResponseEntity<>("error", HttpStatus.FORBIDDEN);
        }
        userService.updatePassword(updatePasswordDto);
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

}
