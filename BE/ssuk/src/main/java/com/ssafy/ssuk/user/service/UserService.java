package com.ssafy.ssuk.user.service;

import com.ssafy.ssuk.user.domain.User;
import com.ssafy.ssuk.user.dto.request.CheckEmailRequestDto;
import com.ssafy.ssuk.user.dto.request.LoginRequestDto;
import com.ssafy.ssuk.user.dto.request.RegisterUserRequestDto;
import com.ssafy.ssuk.utils.jwt.TokenInfo;

import java.util.Optional;

public interface UserService {
    // 사용자 등록
    public void createUser(RegisterUserRequestDto registerUserRequestDto);

    // 사용자 조회
    public Optional<User> findByEmail(CheckEmailRequestDto checkEmailRequestDto);

    // 로그인
    public TokenInfo login(LoginRequestDto loginRequestDto);
}
