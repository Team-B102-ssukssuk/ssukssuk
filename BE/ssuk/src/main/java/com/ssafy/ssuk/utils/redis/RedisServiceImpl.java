package com.ssafy.ssuk.utils.redis;

import com.ssafy.ssuk.utils.auth.oauth.kakao.dto.KakaoToken;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
@RequiredArgsConstructor
public class RedisServiceImpl implements RedisService {

    private final RedisTemplate<String, String> redisTemplate;
    private ValueOperations<String, String> valueOperations;

    @PostConstruct
    public void init() {
        valueOperations = redisTemplate.opsForValue();
    }

    @Override
    public void setEmailCode(String email, String code) {
//        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(email, code);
    }

    @Override
    public String getEmailCode(String email) {
//        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        return valueOperations.get(email);
    }

//    @Override
//    public void updateEmailCode(String email, String newCode) {
////        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
//        valueOperations.set(email, newCode);
//    }

    @Override
    public void setRefreshToken(String userId, String refreshToken) {
//        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(userId, refreshToken);
    }

    @Override
    public String getRefreshToken(String userId) {
//        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        return valueOperations.get(userId);
    }

//    @Override
//    public void updateRefreshToken(String userId, String newRefreshToken) {
////        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
//        valueOperations.set(userId, newRefreshToken);
//    }

    @Override
    public void deleteRefreshToken(String userId) {
        redisTemplate.delete(userId);
    }

    @Override
    public void setKakaoToken(String userId, KakaoToken kakaoToken) {

    }
}
