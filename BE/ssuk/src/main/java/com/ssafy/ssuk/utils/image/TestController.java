package com.ssafy.ssuk.utils.image;

import com.ssafy.ssuk.user.domain.User;
import com.ssafy.ssuk.user.repository.UserRepository;
import com.ssafy.ssuk.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RequiredArgsConstructor
@RequestMapping("/test")
@RestController
@Slf4j
public class TestController {

    private final S3Uploader s3Uploader;
    private final static String IMAGE_URL = "https://ssook.s3.ap-northeast-2.amazonaws.com/image/";

    @PostMapping("/upload")
    public ResponseEntity<ImageInfo> upload(@RequestParam("image") MultipartFile multipartFile) throws IOException {
        return new ResponseEntity<>(s3Uploader.upload(multipartFile), HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<ImageInfo> update(@RequestParam String origin, @RequestParam("image") MultipartFile multipartFile) throws IOException {
        return new ResponseEntity<>(s3Uploader.modifyFile(origin, multipartFile), HttpStatus.OK);
    }

    @PostMapping("/url")
    public ResponseEntity<ImageInfo> update(@RequestParam String url) throws IOException {
        s3Uploader.upload(url);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
