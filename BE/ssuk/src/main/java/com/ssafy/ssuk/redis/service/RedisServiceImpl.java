package com.ssafy.ssuk.redis.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RedisServiceImpl implements RedisService {

    private final RedisTemplate redisTemplate;

    @Override
    public void setEmailCode(String email, String code) {
        HashOperations hashOperations = redisTemplate.opsForHash();
        hashOperations.put("user:"+email, "emailCode", code);
    }

    @Override
    public String getEmailCode(String email) {
        HashOperations hashOperations = redisTemplate.opsForHash();
        Object emailCode = hashOperations.get("user:"+email, "emailCode");
        return emailCode.toString();
    }

    @Override
    public void updateEmailCode(String email, String newCode) {
        HashOperations hashOperations = redisTemplate.opsForHash();
        hashOperations.put("user:"+email, "emailCode", newCode);
    }

    @Override
    public void setRefreshToken(String email, String refreshToken) {
        HashOperations hashOperations = redisTemplate.opsForHash();
        hashOperations.put("user:"+email, "refreshToken", refreshToken);
    }

    @Override
    public String getRefreshToken(String email) {
        HashOperations hashOperations = redisTemplate.opsForHash();
        Object emailCode = hashOperations.get("user:"+email, "refreshToken");
        return emailCode.toString();
    }

    @Override
    public void updateRefreshToken(String email, String newRefreshToken) {
        HashOperations hashOperations = redisTemplate.opsForHash();
        hashOperations.put("user:"+email, "refreshToken", newRefreshToken);
    }
}
