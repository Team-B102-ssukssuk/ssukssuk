package com.ssafy.ssuk.user.service;

import com.ssafy.ssuk.user.domain.User;
import com.ssafy.ssuk.user.dto.request.CheckEmailRequestDto;
import com.ssafy.ssuk.user.dto.request.LoginRequestDto;
import com.ssafy.ssuk.user.dto.request.RegisterUserRequestDto;
import com.ssafy.ssuk.user.dto.request.UpdatePasswordDto;
import com.ssafy.ssuk.utils.jwt.TokenInfo;

import java.util.Optional;

public interface UserService {
    // 사용자 등록
    public void createUser(RegisterUserRequestDto registerUserRequestDto);

    // 로그인
    public TokenInfo login(LoginRequestDto loginRequestDto);

    // 사용자 이메일로 조회
    public Optional<User> findByEmail(CheckEmailRequestDto checkEmailRequestDto);

    // 사용자 닉네임으로 조회
    public Optional<User> findByNickname(String nickname);

    // 사용자 아이디로 조회
    User findById(Integer userId);

    // 비밀번호 재설정
    void updatePassword(UpdatePasswordDto updatePasswordDto);

}
