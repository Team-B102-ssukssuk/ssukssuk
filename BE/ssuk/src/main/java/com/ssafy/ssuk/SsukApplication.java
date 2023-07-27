package com.ssafy.ssuk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController // 테스트용
@RequestMapping("/")
public class SsukApplication {
    @GetMapping("")
    String home()
    {
        return "backend form muchin!";
    }

    @PostMapping("")
    String testPost()
    {
        return "testPost";
    }

    public static void main(String[] args) {
        SpringApplication.run(SsukApplication.class, args);
    }

}
