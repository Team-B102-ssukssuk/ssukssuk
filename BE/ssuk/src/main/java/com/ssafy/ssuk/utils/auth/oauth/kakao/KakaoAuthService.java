package com.ssafy.ssuk.utils.auth.oauth.kakao;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.ssuk.exception.dto.CustomException;
import com.ssafy.ssuk.exception.dto.ErrorCode;
import com.ssafy.ssuk.user.domain.Role;
import com.ssafy.ssuk.user.domain.User;
import com.ssafy.ssuk.user.repository.RoleRepository;
import com.ssafy.ssuk.user.repository.UserRepository;
import com.ssafy.ssuk.utils.auth.jwt.JwtTokenProvider;
import com.ssafy.ssuk.utils.auth.jwt.TokenInfo;
import com.ssafy.ssuk.utils.auth.oauth.kakao.dto.KakaoProfile;
import com.ssafy.ssuk.utils.auth.oauth.kakao.dto.KakaoProperties;
import com.ssafy.ssuk.utils.auth.oauth.kakao.dto.KakaoProviderProperties;
import com.ssafy.ssuk.utils.auth.oauth.kakao.dto.KakaoToken;
import com.ssafy.ssuk.utils.image.S3UploadService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class KakaoAuthService {

    private final KakaoProperties kakaoProperties;
    private final KakaoProviderProperties kakaoProviderProperties;
    private final UserRepository userRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final S3UploadService s3UploadService;

    private final static String RAW_PASSWORD = "ssukssuk_fighting";
    // 카카오로부터 accessToken 받는 함수
    public KakaoToken getAccessToken(String code) {
        // 요청 파라미터
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("grant_type", kakaoProperties.getAuthorizationGrantType());
        parameters.add("client_id", kakaoProperties.getClientId());
        parameters.add("redirect_uri", kakaoProperties.getRedirectUri());
        parameters.add("code", code);
        parameters.add("client_secret", kakaoProperties.getClientSecret());
        // 요청보내고 응답 받기
        String accessTokenUri = kakaoProviderProperties.getTokenUri();
        WebClient webClient = WebClient.create(accessTokenUri);
        String response = webClient.post()
                .uri(accessTokenUri)
                .bodyValue(parameters)
                .header("Contnt-type", "application/x-www-form-urlencoded;charset=utf-8")
                .retrieve()
                .bodyToMono(String.class)
                .block();
        log.debug("kakaoToken={}", response);
        // 응답 파싱해서 토큰 반환
        ObjectMapper objectMapper = new ObjectMapper();
        KakaoToken kakaoToken = null;
        try {
            kakaoToken = objectMapper.readValue(response, KakaoToken.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return kakaoToken;
    }

    public KakaoToken getAccessToken(String code, String redirectURL) {
        // 요청 파라미터
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("grant_type", kakaoProperties.getAuthorizationGrantType());
        parameters.add("client_id", kakaoProperties.getClientId());
        parameters.add("redirect_uri", redirectURL);
        parameters.add("code", code);
        parameters.add("client_secret", kakaoProperties.getClientSecret());
        // 요청보내고 응답 받기
        String accessTokenUri = kakaoProviderProperties.getTokenUri();
        WebClient webClient = WebClient.create(accessTokenUri);
        String response = webClient.post()
                .uri(accessTokenUri)
                .bodyValue(parameters)
                .header("Contnt-type", "application/x-www-form-urlencoded;charset=utf-8")
                .retrieve()
                .bodyToMono(String.class)
                .block();
        log.debug("kakaoToken={}", response);
        // 응답 파싱해서 토큰 반환
        ObjectMapper objectMapper = new ObjectMapper();
        KakaoToken kakaoToken = null;
        try {
            kakaoToken = objectMapper.readValue(response, KakaoToken.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return kakaoToken;
    }

    // 카카오로부터 사용자 정보 받아오기
    public KakaoProfile getUserInfo(String accessToken) {
        String userInfoUri = kakaoProviderProperties.getUserInfoUri();
        // 요청
        WebClient webClient = WebClient.create(userInfoUri);
        String response = webClient.post()
                .uri(userInfoUri)
                .header("Authorization", "Bearer " + accessToken)
                .header("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
                .retrieve()
                .bodyToMono(String.class)
                .block();
        log.debug("userInfo={}", response);
        // 응답 파싱해서 유저 정보 반환
        ObjectMapper objectMapper = new ObjectMapper();
        KakaoProfile kakaoProfile = null;
        try {
            kakaoProfile = objectMapper.readValue(response, KakaoProfile.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return kakaoProfile;
    }

    @Transactional
    public User saveOrGetUser(String accessToken) throws IOException {
        KakaoProfile profile = getUserInfo(accessToken);
        Optional<User> findUser = userRepository.findByEmail(profile.getKakaoAccount().email+".kakao");
        if (findUser.isPresent()) return findUser.get();
        // 사용자가 프로필 사진, 닉네임 동의했는지 체크
        // 동의 안했으면 임시 닉네임 지어주기
        String nickname = null;
        String profileImage = null;

        // 1. 둘 다 동의안했을 때
        if (profile.properties == null) {
            nickname = "쑥쑥";
            profileImage = "default";
        }
        // 2. 닉네임만 동의
        else if (profile.kakaoAccount.profile.profileImageUrl == null) {
            nickname = profile.getKakaoAccount().getProfile().getNickname();
            profileImage = "default";
        }
        // 3. 프로필 사진만 동의
        else if (profile.kakaoAccount.profile.nickname == null) {
            nickname = "쑥쑥";
            profileImage = s3UploadService.upload(profile.getKakaoAccount().getProfile().getProfileImageUrl()).getImageName();
        }
        // 4. 전체 동의
        else {
            nickname = profile.getKakaoAccount().getProfile().getNickname();
            profileImage = profile.getKakaoAccount().getProfile().getProfileImageUrl();
            if (profileImage.equals("http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg")) {
                profileImage = "default";
            } else {
                profileImage = s3UploadService.upload(profileImage).getImageName();
            }
        }

        User newUser = new User(
                profile.getKakaoAccount().getEmail()+".kakao",
                passwordEncoder.encode(RAW_PASSWORD),
                nickname,
                profileImage);

        Role userRole = roleRepository.findByRolename("USER");
        log.debug("userRole={}", userRole);
        newUser.addRole(userRole);
        userRepository.save(newUser);
        return newUser;
    }

    @Transactional
    public TokenInfo kakaoLogin(String email) {
        // 1. Login email/password를 기반으로 Authentication 객체 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(email, RAW_PASSWORD);
        // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
        try {
            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
            // 3. 인증 정보를 기반으로 JWT 생성
            // 3-1. JWT에 담을 유저 정보 추출
            Optional<User> user = userRepository.findByEmail(email);
            if (user.isPresent()) {
                User loginUser = user.get();
                String userId = String.valueOf(loginUser.getId());
                // 3-2. 유저 정보 가져가서 JWT 생성
                TokenInfo tokenInfo = jwtTokenProvider.createToken(authentication, userId);

                return tokenInfo;
            }
            return null;
        } catch (BadCredentialsException e) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }

    }

    public void kakaoLogout(String kakaoAccessToken) {
        String logoutUri = kakaoProviderProperties.getLogoutUri();

        // 요청
        WebClient webClient = WebClient.create(logoutUri);
        String response = webClient.get()
                .uri(logoutUri)
                .header("Authorization", "Bearer " + kakaoAccessToken)
                .retrieve()
                .bodyToMono(String.class)
                .block();
        log.debug("logoutId={}", response);
    }

}
