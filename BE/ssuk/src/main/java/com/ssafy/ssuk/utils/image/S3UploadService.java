package com.ssafy.ssuk.utils.image;

import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.Optional;
import java.util.UUID;

/**
 * upload랑 modify 사용하시면 됩니다.
 * upload : 사진 처음 업로드할 때(카카오 로그인만 해당할것 같아요)
 * modify: 프로필 사진 수정할 때
 */
@Slf4j
@RequiredArgsConstructor
@Component
public class S3UploadService {

    private final AmazonS3Client amazonS3Client;

    private final static String IMAGE_URL = "https://ssook.s3.ap-northeast-2.amazonaws.com/image/";

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.s3.dir}")
    private String dir;

    /**
     * 사진 처음 업로드할 때 사용하시면 됩니다.
     * 반환값 중 imageName에 파일명이 저장되어있고(얘를 유저 db에 저장하면 될거 같아요)
     *          imageUrl에는 url이 있습니다.
     * @param multipartFile : 이미지 파일
     */
    public ImageInfo upload(MultipartFile multipartFile) throws IOException {
        File uploadFile = convert(multipartFile)
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));

        return upload(uploadFile);
    }

    public void uploadForce(MultipartFile multipartFile) throws IOException {
        File uploadFile = convert(multipartFile)
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));
        uploadOne(uploadFile);
    }

    /**
     * 프로필 사진 변경할 때 사용하시면 됩니다.
     * 반환값 중 imageName을 유저 db에 저장하고
     * 프론트에는 imageUrl을 보내주면 될것 같습니다
     * @param originName    : db에 저장되어 있는 원래 사진 이름
     * @param multipartFile : 변경할 사진
     */
    public ImageInfo modifyFile(String originName, MultipartFile multipartFile) throws IOException{
        ImageInfo upload = upload(multipartFile);
        if (!originName.equals("default")) {
            removeOriginFile(originName);
        }
        return upload;
    }

    /**
     * 카카오 회원가입할 때 사용하시면 됩니다.
     * 반환값 중 imageName을 유저 db에 저장하고
     * 프론트에는 imageUrl을 보내주면 될것 같습니다
     * @param url 카카오 url 넣으시면 됩니다!!
     */
    public ImageInfo upload(String url) throws IOException {
        File tempFile = extracted(url);
        return upload(tempFile);
    }

    public static String imageUrl(String fileName) {
        return IMAGE_URL + fileName;
    }

    private static File extracted(String url) throws IOException {
        File tempFile = new File("test.jpg");
        if(tempFile.createNewFile()) {
            try (BufferedInputStream bufferedInputStream = new BufferedInputStream(new URL(url).openStream());
                 FileOutputStream fileOutputStream = new FileOutputStream(tempFile)) {
                byte dataBuffer[] = new byte[1024];
                int bytesRead;
                while ((bytesRead = bufferedInputStream.read(dataBuffer, 0, 1024)) != -1) {
                    fileOutputStream.write(dataBuffer, 0, bytesRead);
                }
            }
        }
        return tempFile;
    }

    private void uploadOne(File uploadFile) {
        String fileName = uploadFile.getName();
        String uploadImageUrl = putS3(uploadFile, fileName);
        log.debug("uploadImageUrl={}", uploadImageUrl);
        removeNewFile(uploadFile);  // 로컬에 생성된 파일 삭제
    }

    private ImageInfo upload(File uploadFile) {
        String fileName = UUID.randomUUID() + "";
        String uploadImageUrl = putS3(uploadFile, dir + fileName);
        log.debug("uploadImageUrl={}", uploadImageUrl);
        removeNewFile(uploadFile);  // 로컬에 생성된 파일 삭제

        return new ImageInfo(fileName, uploadImageUrl);
    }

    private String putS3(File uploadFile, String fileName) {
        log.debug("bucket={}",bucket);
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile));//.withCannedAcl(CannedAccessControlList.PublicRead));
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            log.debug("파일이 삭제되었습니다.");
        } else {
            log.debug("파일이 삭제되지 못했습니다.");
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

    private void removeOriginFile(String originName) {
        try {
            amazonS3Client.deleteObject(bucket, dir + originName);
        } catch (SdkClientException e) {
            log.debug("서버 내 파일 삭제 실패");
        }
    }
}
