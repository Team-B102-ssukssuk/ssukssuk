package com.ssafy.ssuk.user.controller;

import com.ssafy.ssuk.exception.dto.CustomException;
import com.ssafy.ssuk.exception.dto.ErrorCode;
import com.ssafy.ssuk.user.domain.User;
import com.ssafy.ssuk.user.dto.request.*;
import com.ssafy.ssuk.user.service.UserService;
import com.ssafy.ssuk.utils.auth.jwt.TokenInfo;
import com.ssafy.ssuk.utils.email.EmailMessage;
import com.ssafy.ssuk.utils.redis.RedisService;
import com.ssafy.ssuk.utils.response.CommonResponseEntity;
import com.ssafy.ssuk.utils.response.SuccessCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@Slf4j
public class AuthController {
    private final UserService userService;
    private final EmailMessage emailMessage;
    private final RedisService redisService;

    // 회원가입시 이메일 인증코드 발송
    @PostMapping("/join/email")
    public ResponseEntity<?> sendEmailCode
    (@RequestBody @Validated CheckEmailRequestDto checkEmailRequestDto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors())
            throw new CustomException(ErrorCode.INPUT_EXCEPTION);
        Optional<User> findUser = userService.findByEmail(checkEmailRequestDto.getEmail());
        // 사용자 존재 => 중복 => 가입 안됨
        if (findUser.isPresent())
            throw new CustomException(ErrorCode.DUPLICATE_USER_EMAIL);
        // 사용자 존재X => 이메일로 인증코드 발송
        String userEmail = checkEmailRequestDto.getEmail();
        String authCode = emailMessage.sendMail(userEmail);
//        log.debug("userEmail={}",userEmail);
//        log.debug("authCode={}",authCode);
        // 인증코드 Redis 서버에 저장
        redisService.setEmailCode(userEmail, authCode);
        return CommonResponseEntity.getResponseEntity(SuccessCode.OK);
    }

    // 회원가입시 이메일 인증코드 확인
    @PostMapping("/join/emailcheck")
    public ResponseEntity<?> verifyEmailCode
    (@RequestBody @Validated VerifyEmailCodeDto verifyEmailCodeDto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors())
            throw new CustomException(ErrorCode.INPUT_EXCEPTION);
        String userEmail = verifyEmailCodeDto.getEmail();
        String entryCode = verifyEmailCodeDto.getCode();
        String authCode = redisService.getEmailCode(userEmail);
        log.debug("userEmail={}", userEmail);
        log.debug("entryCode={}", entryCode);
        log.debug("authCode={}", authCode);
        if (!entryCode.equals(authCode))
            throw new CustomException(ErrorCode.INVALID_AUTH_CODE);
        return CommonResponseEntity.getResponseEntity(SuccessCode.OK);
    }

    // 회원가입
    @PostMapping("/join")
    public ResponseEntity<?> registerUser
    (@RequestBody @Validated RegisterUserRequestDto registerUserRequestDto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors())
            throw new CustomException(ErrorCode.INPUT_EXCEPTION);
        Optional<User> findUser = userService.findByEmail(registerUserRequestDto.getEmail());
        // 사용자 존재 => 중복 => 가입 안됨
        if (findUser.isPresent())
            throw new CustomException(ErrorCode.DUPLICATE_USER_EMAIL);
        userService.createUser(registerUserRequestDto);
        return CommonResponseEntity.getResponseEntity(SuccessCode.OK);
    }

    // 로그인
    @PostMapping
    public ResponseEntity<?> login
    (@RequestBody @Validated LoginRequestDto loginRequestDto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors())
            throw new CustomException(ErrorCode.INPUT_EXCEPTION);
        TokenInfo tokenInfo = userService.login(loginRequestDto);
        log.debug("tokenInfo={}", tokenInfo.toString());

        // <userId, refreshToken> 으로 Redis 서버에 저장
        Optional<User> findUser = userService.findByEmail(loginRequestDto.getEmail());
        if (!findUser.isPresent())
            throw new CustomException(ErrorCode.USER_NOT_FOUND);

        String userId = String.valueOf(findUser.get().getId());
        String refreshToken = tokenInfo.getRefreshToken();
        redisService.setRefreshToken(userId, refreshToken);

//        String token = redisService.getRefreshToken(userId);
//        log.debug("refreshToken in Redis={}",token);
        return CommonResponseEntity.getResponseEntity(SuccessCode.OK, tokenInfo);
    }

    // 비밀번호 재설정시 이메일 인증코드 발송
    @PostMapping("/password/email")
    public ResponseEntity<?> sendPasswordEmailCode
    (@RequestBody @Validated CheckEmailRequestDto checkEmailRequestDto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors())
            throw new CustomException(ErrorCode.INPUT_EXCEPTION);
        Optional<User> findUser = userService.findByEmail(checkEmailRequestDto.getEmail());
        // 사용자 존재 x => 없는 사용자
        if (!findUser.isPresent())
            throw new CustomException(ErrorCode.USER_NOT_FOUND);

        // 사용자 존재 => 이메일로 인증코드 보내기
        log.debug("인증코드 보낼거야");
        String userEmail = checkEmailRequestDto.getEmail();
        String authCode = emailMessage.sendMail(userEmail);
        log.debug("인증코드 보냈어");

        // 인증코드 Redis 서버에 저장
        redisService.setEmailCode(userEmail, authCode);
        return CommonResponseEntity.getResponseEntity(SuccessCode.OK);
    }

    // 비밀번호 재설정시 이메일 인증코드 확인
    @PostMapping("/password/emailcheck")
    public ResponseEntity<?> verifyPasswordEmailCode
    (@RequestBody @Validated VerifyEmailCodeDto verifyEmailCodeDto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors())
            throw new CustomException(ErrorCode.INPUT_EXCEPTION);
        String userEmail = verifyEmailCodeDto.getEmail();
        String entryCode = verifyEmailCodeDto.getCode();
        String authCode = redisService.getEmailCode(userEmail);
        log.debug("userEmail={}", userEmail);
        log.debug("entryCode={}", entryCode);
        log.debug("authCode={}", authCode);
        if (!entryCode.equals(authCode))
            throw new CustomException(ErrorCode.INVALID_AUTH_CODE);
        return CommonResponseEntity.getResponseEntity(SuccessCode.OK);
    }

    // 비밀번호 재설정
    @PutMapping("/password")
    public ResponseEntity<?> resetPassword
    (@RequestBody @Validated ResetPasswordDto resetPasswordDto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors())
            throw new CustomException(ErrorCode.INPUT_EXCEPTION);
        userService.updatePassword(resetPasswordDto.getEmail(), resetPasswordDto.getPassword());
        return CommonResponseEntity.getResponseEntity(SuccessCode.OK);
    }

}