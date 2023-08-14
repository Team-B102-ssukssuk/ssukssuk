package com.ssafy.ssuk.user.controller;

import com.ssafy.ssuk.badge.domain.BadgeCode;
import com.ssafy.ssuk.badge.dto.response.UserBadgeResponseDto;
import com.ssafy.ssuk.badge.service.BadgeService;
import com.ssafy.ssuk.collection.service.CollectionService;
import com.ssafy.ssuk.exception.dto.CustomException;
import com.ssafy.ssuk.exception.dto.ErrorCode;
import com.ssafy.ssuk.notify.service.NotificationService;
import com.ssafy.ssuk.plant.service.GardenService;
import com.ssafy.ssuk.user.domain.User;
import com.ssafy.ssuk.user.dto.request.CheckPasswordDto;
import com.ssafy.ssuk.user.dto.request.UpdateNicknameDto;
import com.ssafy.ssuk.user.dto.request.UpdatePasswordDto;
import com.ssafy.ssuk.user.dto.response.InfoResponseDto;
import com.ssafy.ssuk.user.service.UserService;
import com.ssafy.ssuk.utils.auth.jwt.TokenInfo;
import com.ssafy.ssuk.utils.email.EmailMessage;
import com.ssafy.ssuk.utils.image.S3UploadService;
import com.ssafy.ssuk.utils.redis.RedisService;
import com.ssafy.ssuk.utils.response.CommonResponseEntity;
import com.ssafy.ssuk.utils.response.SuccessCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
public class UserController {
    private final UserService userService;
    private final EmailMessage emailMessage;
    private final GardenService gardenService;
    private final BadgeService badgeService;
    private final CollectionService collectionService;
    private final RedisService redisService;
    private final S3UploadService s3UploadService;
    private final PasswordEncoder passwordEncoder;
    private final NotificationService notificationService;

    // 유저 프로필 페이지 정보
    @GetMapping("/info")
    public ResponseEntity<CommonResponseEntity> searchUserInfo(@RequestAttribute Integer userId) {
        User user = userService.findById(userId);
        if (user == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }

        InfoResponseDto infoResponseDto = new InfoResponseDto();

        infoResponseDto.setNickname(user.getNickname());
        infoResponseDto.setImageUrl(S3UploadService.imageUrl(user.getProfileImage()));

        gardenService.findAllByUserId(userId).forEach(g -> {
            if (g.getIsUse()) infoResponseDto.addMyPlantCount();
            infoResponseDto.addGardenCount();
        });

        List<UserBadgeResponseDto> badges = badgeService.findAllWithUserId(userId);
        infoResponseDto.setBadges(badges);

        int collectionCount = collectionService.findAllByUserId(userId).size();
        infoResponseDto.setCollectionCount(collectionCount);

        return CommonResponseEntity.getResponseEntity(SuccessCode.OK, infoResponseDto);
    }

    // 닉네임 수정
    @PutMapping("/nickname")
    public ResponseEntity<?> updateNickname
    (@RequestAttribute Integer userId, @RequestBody @Validated UpdateNicknameDto updateNicknameDto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors())
            throw new CustomException(ErrorCode.INPUT_EXCEPTION);
        log.debug("userId={}", userId);
        userService.updateNickname(userId, updateNicknameDto.getNickname());
        return CommonResponseEntity.getResponseEntity(SuccessCode.OK);
    }

    // 프로필 사진 변경
    @PutMapping("/image")
    public ResponseEntity<?> updateProfileImage
    (@RequestAttribute Integer userId, @RequestPart(name = "image") MultipartFile multipartFile) throws Exception {
        String originImageName = userService.findById(userId).getProfileImage();
        log.debug("originImage={}", originImageName);
        log.debug("multipart={}", multipartFile);
        String newImageName = s3UploadService.modifyProfileImage(originImageName, multipartFile).getImageName();
        log.debug("newImage={}", newImageName);
        userService.updateProfileImage(userId, newImageName);

        if (badgeService.checkUserBadge(BadgeCode.치즈.getCode(), userId) == false) {
            badgeService.saveUserBadge(BadgeCode.치즈.getCode(), userId);
            notificationService.pushAndInsertNotificationForBadge(userId, BadgeCode.치즈);
        }
        return CommonResponseEntity.getResponseEntity(SuccessCode.OK, newImageName);
    }

    // 비밀번호 확인
    @GetMapping("/password")
    public ResponseEntity<?> checkPassword(@RequestAttribute Integer userId, @RequestBody @Validated CheckPasswordDto checkPasswordDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            throw new CustomException(ErrorCode.INPUT_EXCEPTION);
        // 현재 로그인한 유저 정보 찾아오기, 입력한 비밀번호 맞는지 확인
        User loginUser = userService.findById(userId);
        if (!passwordEncoder.matches(checkPasswordDto.getPassword(), loginUser.getPassword()))
            throw new CustomException(ErrorCode.INVALID_PASSWORD);
        return CommonResponseEntity.getResponseEntity(SuccessCode.OK);
    }

    // 비밀번호 변경
    @PutMapping("/password/alter")
    public ResponseEntity<?> updatePassword(@RequestAttribute Integer userId, @RequestBody @Validated UpdatePasswordDto updatePasswordDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            throw new CustomException(ErrorCode.INPUT_EXCEPTION);
        User loginUser = userService.findById(userId);
        userService.updatePassword(loginUser.getEmail(), updatePasswordDto.getPassword());
        return CommonResponseEntity.getResponseEntity(SuccessCode.OK);
    }

    // 리프레시 토큰 재발급
    @PostMapping("/token")
    public ResponseEntity<?> recreateToken
    (@RequestHeader(value = "Authorization", required = false) String bearerToken, HttpServletRequest request) {
        String refreshToken = null;
        if (bearerToken.startsWith("Bearer"))
            refreshToken = bearerToken.substring(7);
        // 헤더에 리프레시토큰 => 토큰 검증 => 토큰 재발급 => 레디스 서버 저장
        TokenInfo tokenInfo = userService.recreateToken(refreshToken, request);
        return CommonResponseEntity.getResponseEntity(SuccessCode.OK, tokenInfo);
    }

    // 로그아웃
    @GetMapping
    public ResponseEntity<?> logout(@RequestAttribute Integer userId) {
        User loginUser = userService.findById(userId);
        String email = loginUser.getEmail();
        if ((email.substring(email.length() - 6, email.length())).equals(".kakao")) {
            log.debug("카카오 로그아웃할거야");
            /*
                1. redis에서 userId로 카카오 accessToken 꺼내오기
                2. 카카오에 로그아웃 요청
                3. accessToken 만료? refreshToken으로 다시 accessToken 재발급 요청

             */
//            kakaoAuthService.kakaoLogout(카카오 에세스토큰);
        }
        userService.logout(userId);
        return CommonResponseEntity.getResponseEntity(SuccessCode.OK);
    }

    // 회원 탈퇴
    @PutMapping("/quit")
    public ResponseEntity<?> deleteUser(@RequestAttribute Integer userId) {
        User loginUser = userService.findById(userId);
        userService.deleteUser(loginUser.getId());
        return CommonResponseEntity.getResponseEntity(SuccessCode.OK);
    }


}