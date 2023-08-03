package com.ssafy.ssuk.redis.service;

import org.springframework.stereotype.Service;

@Service
public interface RedisService {
    // 이메일 인증코드 저장
    public void setEmailCode(String key, String value);

    // 이메일 인증코드 불러오기
    public String getEmailCode(String key);

    // 이메일 인증코드 업데이트
    public void updateEmailCode(String key, String value);

    // refreshToken 저장
    public void setRefreshToken(String key, String value);

    // refreshToken 불러오기
    public String getRefreshToken(String key);

    // refreshToken 업데이트
    public void updateRefreshToken(String key, String value);
}
