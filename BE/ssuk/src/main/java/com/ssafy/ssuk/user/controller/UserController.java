package com.ssafy.ssuk.user.controller;

import com.ssafy.ssuk.badge.domain.BadgeCode;
import com.ssafy.ssuk.badge.dto.response.UserBadgeResponseDto;
import com.ssafy.ssuk.badge.service.BadgeService;
import com.ssafy.ssuk.collection.service.CollectionService;
import com.ssafy.ssuk.exception.dto.CustomException;
import com.ssafy.ssuk.exception.dto.ErrorCode;
import com.ssafy.ssuk.plant.service.GardenService;
import com.ssafy.ssuk.utils.auth.jwt.JwtTokenProvider;
import com.ssafy.ssuk.utils.redis.RedisService;
import com.ssafy.ssuk.user.domain.User;
import com.ssafy.ssuk.user.dto.request.*;
import com.ssafy.ssuk.user.dto.response.InfoResponseDto;
import com.ssafy.ssuk.user.service.UserService;
import com.ssafy.ssuk.utils.auth.jwt.TokenInfo;
import com.ssafy.ssuk.utils.auth.oauth.kakao.KakaoAuthService;
import com.ssafy.ssuk.utils.email.EmailMessage;
import com.ssafy.ssuk.utils.image.S3UploadService;
import com.ssafy.ssuk.utils.response.CommonResponseEntity;
import com.ssafy.ssuk.utils.response.SuccessCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.net.URI;
import java.util.List;
import java.util.Optional;

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
    private final KakaoAuthService kakaoAuthService;
    private final S3UploadService s3UploadService;

    // 회원가입시 이메일 인증코드 발송
    @PostMapping("/join/email")
    public ResponseEntity<?> sendEmailCode
    (@RequestBody @Validated CheckEmailRequestDto checkEmailRequestDto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>("요청값 검증 실패", HttpStatus.FORBIDDEN);
        }
        Optional<User> findUser = userService.findByEmail(checkEmailRequestDto.getEmail());
        // 사용자 존재 => 중복 => 가입 안됨
        if (findUser.isPresent()) {
            throw new CustomException(ErrorCode.DUPLICATE_USER_EMAIL);
//            return new ResponseEntity<>("중복된 이메일", HttpStatus.CONFLICT);
        }
        // 사용자 존재X => 이메일로 인증코드 발송
        String userEmail = checkEmailRequestDto.getEmail();
        String authCode = emailMessage.sendMail(userEmail);
//        log.debug("userEmail={}",userEmail);
//        log.debug("authCode={}",authCode);
        // 인증코드 Redis 서버에 저장
        redisService.setEmailCode(userEmail, authCode);
        return new ResponseEntity<>("인증코드 발송 완료", HttpStatus.OK);
    }

    // 회원가입시 이메일 인증코드 확인
    @PostMapping("/join/emailcheck")
    public ResponseEntity<?> verifyEmailCode
    (@RequestBody @Validated VerifyEmailCodeDto verifyEmailCodeDto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>("요청값 검증 실패", HttpStatus.FORBIDDEN);
        }
        String userEmail = verifyEmailCodeDto.getEmail();
        String entryCode = verifyEmailCodeDto.getCode();
        String authCode = redisService.getEmailCode(userEmail);
        log.debug("userEmail={}", userEmail);
        log.debug("entryCode={}", entryCode);
        log.debug("authCode={}", authCode);
        if (entryCode.equals(authCode))
            return new ResponseEntity<>("OK", HttpStatus.OK);
        return new ResponseEntity<>("FALSE", HttpStatus.NOT_FOUND);
    }

    // 닉네임 중복 확인
//    @GetMapping("/nickname/{nickname}")
//    public ResponseEntity<?> verifyNickname(@PathVariable String nickname) {
//        log.debug("nickname={}", nickname);
//        Optional<User> findUser = userService.findByNickname(nickname);
//        if (findUser.isPresent())
//            throw new CustomException(ErrorCode.DUPLICATE_USER_NICKNAME);
////            return new ResponseEntity<>("중복된 닉네임", HttpStatus.CONFLICT);
//        return new ResponseEntity<>("OK", HttpStatus.OK);
//    }

    // 회원가입
    @PostMapping("/join")
    public ResponseEntity<?> registerUser
    (@RequestBody @Validated RegisterUserRequestDto registerUserRequestDto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>("error", HttpStatus.FORBIDDEN);
        }
        userService.createUser(registerUserRequestDto);
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    // 로그인
    @PostMapping
    public ResponseEntity<?> login(@RequestBody @Validated LoginRequestDto loginRequestDto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>("error", HttpStatus.FORBIDDEN);
        }
        TokenInfo tokenInfo = userService.login(loginRequestDto);
        log.debug("tokenInfo={}", tokenInfo.toString());
        // <userId, refreshToken> 으로 Redis 서버에 저장
        Optional<User> findUser = userService.findByEmail(loginRequestDto.getEmail());
        if (!findUser.isPresent()) throw new CustomException(ErrorCode.USER_NOT_FOUND);
        String userId = String.valueOf(findUser.get().getId());
        String refreshToken = tokenInfo.getRefreshToken();
        redisService.setRefreshToken(userId, refreshToken);
        String token = redisService.getRefreshToken(userId);
        log.debug("refreshToken in Redis={}",token);
        return new ResponseEntity<>(tokenInfo, HttpStatus.OK);
    }

    @GetMapping("/info")
    public ResponseEntity<CommonResponseEntity> searchUserInfo(@RequestAttribute Integer userId) {
        User user = userService.findById(userId);
        if(user == null){
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

    // 비밀번호 재설정시 이메일 인증코드 발송
    @PostMapping("/password/email")
    public ResponseEntity<?> sendPasswordEmailCode
    (@RequestBody @Validated CheckEmailRequestDto checkEmailRequestDto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>("요청값 검증 실패", HttpStatus.FORBIDDEN);
        }
        Optional<User> findUser = userService.findByEmail(checkEmailRequestDto.getEmail());
        // 사용자 존재 x => 없는 사용자
        if (!findUser.isPresent()) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        // 사용자 존재 => 이메일로 인증코드 보내기
        String userEmail = checkEmailRequestDto.getEmail();
        String authCode = emailMessage.sendMail(userEmail);
        log.debug("인증코드 보낼거야");
        // 인증코드 Redis 서버에 저장
        redisService.setEmailCode(userEmail, authCode);
        log.debug("인증코드 보냈어");
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    // 비밀번호 재설정시 이메일 인증코드 확인
    @PostMapping("/password/emailcheck")
    public ResponseEntity<?> verifyPasswordEmailCode
    (@RequestBody @Validated VerifyEmailCodeDto verifyEmailCodeDto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>("요청값 검증 실패", HttpStatus.FORBIDDEN);
        }
        String userEmail = verifyEmailCodeDto.getEmail();
        String entryCode = verifyEmailCodeDto.getCode();
        String authCode = redisService.getEmailCode(userEmail);
        log.debug("userEmail={}", userEmail);
        log.debug("entryCode={}", entryCode);
        log.debug("authCode={}", authCode);
        if (entryCode.equals(authCode))
            return new ResponseEntity<>("OK", HttpStatus.OK);
        return new ResponseEntity<>("FALSE", HttpStatus.NOT_FOUND);
    }

    // 비밀번호 재설정
    @PutMapping("/password")
    public ResponseEntity<?> updatePassword
    (@RequestBody @Validated UpdatePasswordDto updatePasswordDto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>("error", HttpStatus.FORBIDDEN);
        }
        userService.updatePassword(updatePasswordDto);
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    // 닉네임 수정
    @PutMapping("/nickname")
    public ResponseEntity<?> updateNickname
    (@RequestAttribute Integer userId, @RequestBody @Validated UpdateNicknameDto updateNicknameDto, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors())
            throw new CustomException(ErrorCode.INPUT_EXCEPTION);
        log.debug("userId={}",userId);
        userService.updateNickname(userId, updateNicknameDto.getNickname());
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }
    // 카카오로그인
    // 카카오 인가코드 받아서 카카오서버 accesstoken 발급
    // accesstoken으로 사용자 정보 확인 후 쑥쑥 로그인 accesstoken 발급
    @GetMapping("/kakao/callback")
    public ResponseEntity<?> kakaoLogin(@RequestParam String code) throws Exception {
        log.debug("code={}", code);
        String kakaoAccessToken = kakaoAuthService.getAccessToken(code).getAccessToken();
        // 사용자 정보 가져오거나 회원가입
        User user = kakaoAuthService.saveOrGetUser(kakaoAccessToken);
//        redisService.
        log.debug("회원가입 또는 사용자 정보 가져오기");
        TokenInfo tokenInfo = kakaoAuthService.kakaoLogin(user.getEmail());
        log.debug("loginTokenInfo={}", tokenInfo);

        return new ResponseEntity<>(tokenInfo, HttpStatus.OK);
    }

//    // 카카오로그인
//    // 카카오 인가코드 받아서 카카오서버 accesstoken 발급
//    // accesstoken으로 사용자 정보 확인 후 쑥쑥 로그인 accesstoken 발급
//    @GetMapping("/kakao/callback")
//    public ResponseEntity<?> kakaoLogin(@RequestParam String code, HttpSession session) throws Exception {
//            log.debug("code={}", code);
//        String kakaoAccessToken = kakaoAuthService.getAccessToken(code).getAccessToken();
//        // 사용자 정보 가져오거나 회원가입
//        User user = kakaoAuthService.saveOrGetUser(kakaoAccessToken);
////        redisService.
//        log.debug("회원가입 또는 사용자 정보 가져오기");
//        TokenInfo tokenInfo = kakaoAuthService.kakaoLogin(user.getEmail());
//        log.debug("loginTokenInfo={}", tokenInfo);
//
//        // 토큰 정보 세션에 저장
//        session.setAttribute("tokenInfo", tokenInfo);
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setLocation(URI.create("http://i9b102.p.ssafy.io:8080"));
//
//        return new ResponseEntity<>(headers, HttpStatus.SEE_OTHER);
//    }

    // 프로필 사진 변경
    @PutMapping("/image")
    public ResponseEntity<?> updateProfileImage
    (@RequestAttribute Integer userId ,@RequestPart(name = "image") MultipartFile multipartFile) throws Exception {
        String originImageName = userService.findById(userId).getProfileImage();
        log.debug("originImage={}", originImageName);
        log.debug("multipart={}", multipartFile);
        String newImageName = s3UploadService.modifyFile(originImageName, multipartFile).getImageName();
        log.debug("newImage={}", newImageName);
        userService.updateProfileImage(userId, newImageName);

        if (badgeService.checkUserBadge(BadgeCode.치즈.getCode(), userId) == false) {
            badgeService.saveUserBadge(BadgeCode.치즈.getCode(), userId);
        }

        return new ResponseEntity<>(newImageName, HttpStatus.OK);
    }

    @PostMapping("/token")
    public ResponseEntity<?> recreateToken
            (@RequestHeader(value = "Authorization", required = false) String bearerToken, HttpServletRequest request) {
        String refreshToken = null;
        if (bearerToken.startsWith("Bearer"))
            refreshToken = bearerToken.substring(7);
        // 헤더에 리프레시토큰 => 토큰 검증 => 토큰 재발급 => 레디스 서버 저장
        TokenInfo tokenInfo = userService.recreateToken(refreshToken, request);
    return new ResponseEntity<>(tokenInfo, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> logout(@RequestAttribute Integer userId) {
        User loginUser = userService.findById(userId);
        String email = loginUser.getEmail();
        if ((email.substring(email.length()-6, email.length())).equals(".kakao")) {
            log.debug("카카오 로그아웃할거야");
            log.debug("근데 아직 뭐가 정답인 지 모르겠어");
            /*
                1. redis에서 userId로 카카오 accessToken 꺼내오기
                2. 카카오에 로그아웃 요청
                3. accessToken 만료? refreshToken으로 다시 accessToken 재발급 요청

             */
//            kakaoAuthService.kakaoLogout(카카오 에세스토큰);
        }
        log.debug("로컬 로그아웃할거야");
        userService.logout(userId);
        return null;
    }



    @GetMapping("/logout/test")
    public ResponseEntity<CommonResponseEntity> testLogout() {
        return CommonResponseEntity.getResponseEntity(SuccessCode.SUCCESS_CODE, "please!!");
    }

}