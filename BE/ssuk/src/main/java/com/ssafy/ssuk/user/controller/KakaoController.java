package com.ssafy.ssuk.user.controller;

import com.ssafy.ssuk.utils.auth.oauth.kakao.KakaoAuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Slf4j
@Controller
@RequiredArgsConstructor
public class KakaoController {

    private final KakaoAuthService kakaoAuthService;

    private final String REDIRECT_URL = "http://i9b102.p.ssafy.io:8080/kakao";
    @GetMapping("/kakao")
    public String kakaoLogin(@RequestParam String code) throws Exception {
        log.debug("tmpcode={}", code);
        String kakaoAccessToken = kakaoAuthService.getAccessToken(code, REDIRECT_URL).getAccessToken();
//        // 사용자 정보 가져오거나 회원가입
//        User user = kakaoAuthService.saveOrGetUser(kakaoAccessToken);
////        redisService.
//        log.debug("회원가입 또는 사용자 정보 가져오기");
//        TokenInfo tokenInfo = kakaoAuthService.kakaoLogin(user.getEmail());
//        log.debug("loginTokenInfo={}", tokenInfo);

        return "redirect:http://i9b102.p.ssafy.io:8080";
    }
}