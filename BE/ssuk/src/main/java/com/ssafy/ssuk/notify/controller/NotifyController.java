package com.ssafy.ssuk.notify.controller;

import com.ssafy.ssuk.notify.service.FcmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;

@Controller
@RequestMapping("/notify")
public class NotifyController {

    private final FcmService fcmService;

    @Autowired
    public NotifyController(FcmService fcmService) {
        this.fcmService = fcmService;
    }

    @GetMapping("/test")
    ResponseEntity<?> testNotify() throws IOException {
        fcmService.sendMessageTo("1","1","1","1","1");

        return ResponseEntity.ok().build();
    }

    @GetMapping("/token")
    ResponseEntity<?> getToken() throws IOException {
        String result = fcmService.getAccessToken();

        return ResponseEntity.ok(result);
    }

}
