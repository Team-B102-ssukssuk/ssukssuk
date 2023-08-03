package com.ssafy.ssuk.utils.image;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Slf4j
//@RequiredArgsConstructor
//@Component
public class S3Uploader {

//    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.s3.dir}")
    private String dir;

    public String upload(MultipartFile multipartFile) throws IOException {
        File uploadFile = convert(multipartFile)
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));

        return upload(uploadFile);
    }

    private String upload(File uploadFile) {
        String fileName = dir + UUID.randomUUID();
//        String uploadImageUrl = putS3(uploadFile, fileName);
        String uploadImageUrl = null;
        removeNewFile(uploadFile);  // 로컬에 생성된 파일 삭제
        return uploadImageUrl;
    }

//    private String putS3(File uploadFile, String fileName) {
//        // 권한을 public read로 올렸는데 나중에 수정할수도있음
//        log.debug("bucket={}",bucket);
//        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile));//.withCannedAcl(CannedAccessControlList.PublicRead));
//        return amazonS3Client.getUrl(bucket, fileName).toString();
//    }

    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            log.info("파일이 삭제되었습니다.");
        } else {
            log.info("파일이 삭제되지 못했습니다.");
        }
    }

    // s3에는 multipartfile이 전송이 안된다함
    private Optional<File> convert(MultipartFile file) throws IOException {
        File convertFile = new File(file.getOriginalFilename());
        if(convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }

        return Optional.empty();
    }
}
