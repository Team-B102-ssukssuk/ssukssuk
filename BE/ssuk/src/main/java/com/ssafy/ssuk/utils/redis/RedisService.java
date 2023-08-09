package com.ssafy.ssuk.utils.redis;

import com.ssafy.ssuk.utils.auth.oauth.kakao.dto.KakaoToken;
import org.springframework.stereotype.Service;

@Service
public interface RedisService {
    // 이메일 인증코드 저장 및 업데이트
    void setEmailCode(String key, String value);

    // 이메일 인증코드 불러오기
    String getEmailCode(String key);

//    // 이메일 인증코드 업데이트
//    void updateEmailCode(String key, String value);

    // refreshToken 저장 및 업데이트
    void setRefreshToken(String key, String value);

    // refreshToken 불러오기
    String getRefreshToken(String key);

//    // refreshToken 업데이트
//    void updateRefreshToken(String key, String value);

    // refreshToken 삭제
    void deleteRefreshToken(String key);

    // 카카오 토큰 저장 및 업데이트
    void setKakaoToken(String key, KakaoToken kakaoToken);

    // 카카오 토큰 불러오기


}
