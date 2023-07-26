package com.ssafy.ssuk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController // 테스트용
public class SsukApplication {
    @RequestMapping("/")
    String home() {
        return "hi, we are we are!";
    }

    public static void main(String[] args) {
        SpringApplication.run(SsukApplication.class, args);
    }

}
