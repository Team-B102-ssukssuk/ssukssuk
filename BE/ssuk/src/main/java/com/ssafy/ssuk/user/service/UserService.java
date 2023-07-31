package com.ssafy.ssuk.user.service;

import com.ssafy.ssuk.user.domain.User;
import com.ssafy.ssuk.user.dto.request.CheckEmailRequestDto;
import com.ssafy.ssuk.user.dto.request.RegisterUserRequestDto;

public interface UserService {
    // 사용자 등록
    public void createUser(RegisterUserRequestDto registerUserRequestDto);

    // 사용자 조회
    public User findByEmail(CheckEmailRequestDto checkEmailRequestDto);
}
