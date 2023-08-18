//package com.ssafy.ssuk.redis.controller;

//import com.ssafy.ssuk.redis.service.RedisServicetest;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequiredArgsConstructor
//public class RedisController {
//    private final RedisServicetest redisService;
//
//    @PostMapping("/redisTest")
//    public ResponseEntity<?> addRedisKey() {
//        redisService.setValues("apple", "red");
//        return new ResponseEntity<>(HttpStatus.CREATED);
//    }
//
//    @GetMapping("redisTest/{key}")
//    public ResponseEntity<?> getRedisKey(@PathVariable String key) {
//        String value = redisService.getValues(key);
//        return new ResponseEntity<>(value, HttpStatus.OK);
//    }

//    @PostMapping("/redisTest")
//    public ResponseEntity<?> addRedisKey() {
//        ValueOperations<String, String> vop = redisTemplate.opsForValue();
//        vop.set("yellow","banana");
//        vop.set("red","apple");
//        return new ResponseEntity<>(HttpStatus.CREATED);
//    }
//
//    @GetMapping("redisTest/{key}")
//    public ResponseEntity<?> getRedisKey(@PathVariable String key) {
//        ValueOperations<String, String> vop = redisTemplate.opsForValue();
//        String value = vop.get(key);
//        return new ResponseEntity<>(value, HttpStatus.OK);
//    }

//}
