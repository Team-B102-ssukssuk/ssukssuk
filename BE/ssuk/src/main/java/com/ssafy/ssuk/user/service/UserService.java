package com.ssafy.ssuk.user.service;

import com.ssafy.ssuk.user.domain.User;
import com.ssafy.ssuk.user.dto.request.*;
import com.ssafy.ssuk.utils.auth.jwt.TokenInfo;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

public interface UserService {
    // 사용자 등록
    void createUser(RegisterUserRequestDto registerUserRequestDto);

    // 로그인
    TokenInfo login(LoginRequestDto loginRequestDto);

    // 사용자 이메일로 조회
    Optional<User> findByEmail(String email);

    // 사용자 닉네임으로 조회
    Optional<User> findByNickname(String nickname);

    // 사용자 아이디로 조회
    User findById(Integer userId);

    // 비밀번호 재설정
    void updatePassword(UpdatePasswordDto updatePasswordDto);

    // 닉네임 재설정
    void updateNickname(Integer userId, String newNickname);

    // 프로필 이미지 변경
    void updateProfileImage(Integer userId, String newProfileImage);

    // 토큰 재발급
    TokenInfo recreateToken(String refreshToken, HttpServletRequest request);
}
