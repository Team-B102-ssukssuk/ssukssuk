package com.ssafy.ssuk.user.controller;

import com.ssafy.ssuk.badge.domain.BadgeCode;
import com.ssafy.ssuk.badge.service.BadgeService;
import com.ssafy.ssuk.exception.dto.CustomException;
import com.ssafy.ssuk.exception.dto.ErrorCode;
import com.ssafy.ssuk.user.domain.User;
import com.ssafy.ssuk.user.dto.request.KakaoCodeRequsetDto;
import com.ssafy.ssuk.user.service.UserService;
import com.ssafy.ssuk.utils.auth.jwt.TokenInfo;
import com.ssafy.ssuk.utils.auth.oauth.kakao.KakaoAuthService;
import com.ssafy.ssuk.utils.auth.oauth.kakao.dto.KakaoProfile;
import com.ssafy.ssuk.utils.response.CommonResponseEntity;
import com.ssafy.ssuk.utils.response.SuccessCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/auth/kakao")
public class KakaoController {

    private final KakaoAuthService kakaoAuthService;
    private final BadgeService badgeService;
    private final UserService userService;

    private final String REDIRECT_URL = "http://i9b102.p.ssafy.io:8080/auth/kakao";

    @GetMapping("")
    public String kakao(@RequestParam String code) throws Exception {
        log.debug("tmpcode={}", code);
        return "redirect:" + REDIRECT_URL + "?code=" + code;
    }

    @PostMapping("/login")
    public ResponseEntity<CommonResponseEntity> kakaoLogin(@RequestBody @Validated KakaoCodeRequsetDto kakaoCodeRequsetDto) {
        String code = kakaoCodeRequsetDto.getCode();
        log.debug("code={}", code);
        String kakaoAccessToken = kakaoAuthService.getAccessToken(code).getAccessToken();
        log.debug(kakaoAccessToken);
        // 사용자 정보 가져오거나 회원가입
        KakaoProfile profile = kakaoAuthService.getUserInfo(kakaoAccessToken);
        log.debug("profile={}", profile);
        User user = userService.findByEmail(profile.getKakaoAccount().email + ".kakao")
                .orElseGet(() -> kakaoSignUp(profile));
        log.debug("User={}", user);
        TokenInfo tokenInfo = kakaoAuthService.kakaoLogin(user.getEmail());
        log.debug("loginTokenInfo={}", tokenInfo);

        return CommonResponseEntity.getResponseEntity(SuccessCode.OK, tokenInfo);
    }

    private User kakaoSignUp(KakaoProfile profile) {
        try {
            User user = userService.createUser(kakaoAuthService.makeNewUser(profile));
            if (!user.getProfileImage().equals("default") && badgeService.checkUserBadge(BadgeCode.치즈.getCode(), user.getId()) == false) {
                badgeService.saveUserBadge(BadgeCode.치즈.getCode(), user.getId());
            }
            return user;
        } catch (IOException e) {
            throw new CustomException(ErrorCode.KAKAO_ERROR);
        }
    }
}