package com.ssafy.ssuk.utils.image;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RequestMapping("/test")
@RestController
@Slf4j
public class ImageTestController {

    private final S3UploadService s3UploadService;
    private final static String IMAGE_URL = "https://ssook.s3.ap-northeast-2.amazonaws.com/image/";

    @PostMapping("/upload")
    public ResponseEntity<ImageInfo> upload(@RequestParam("image") MultipartFile multipartFile) throws IOException {
        return new ResponseEntity<>(s3UploadService.upload(multipartFile), HttpStatus.OK);
    }

    @PostMapping("/upload/force")
    public ResponseEntity<String> uploadOne(@RequestParam("file") MultipartFile multipartFile) throws IOException {
        s3UploadService.uploadForce(multipartFile);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<ImageInfo> update(@RequestParam String origin, @RequestParam("image") MultipartFile multipartFile) throws IOException {
        return new ResponseEntity<>(s3UploadService.modifyFile(origin, multipartFile), HttpStatus.OK);
    }

    @PostMapping("/url")
    public ResponseEntity<ImageInfo> update(@RequestParam String url) throws IOException {
        s3UploadService.upload(url);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
