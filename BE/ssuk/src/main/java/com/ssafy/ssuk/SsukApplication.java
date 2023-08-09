package com.ssafy.ssuk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication(exclude = {
        org.springframework.cloud.aws.autoconfigure.context.ContextInstanceDataAutoConfiguration.class,
        org.springframework.cloud.aws.autoconfigure.context.ContextStackAutoConfiguration.class,
        org.springframework.cloud.aws.autoconfigure.context.ContextRegionProviderAutoConfiguration.class
})
@RestController // 테스트용
@RequestMapping("/")
public class SsukApplication {

    @GetMapping("")
    String home()
    {
        return "<div style='display: flex; width: 100%; height: 100vh;\n" +
                "    align-items: center;\n" +
                "    justify-content: center;'>\n" +
                "    <img src='https://ssook.s3.ap-northeast-2.amazonaws.com/image/Loading.gif' loop='infinite'/>\n" +
                "</div>";
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
