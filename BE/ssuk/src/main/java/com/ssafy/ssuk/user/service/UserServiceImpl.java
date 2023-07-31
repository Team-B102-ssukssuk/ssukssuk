package com.ssafy.ssuk.user.service;

import com.ssafy.ssuk.user.domain.User;
import com.ssafy.ssuk.user.dto.request.CheckEmailRequestDto;
import com.ssafy.ssuk.user.dto.request.RegisterUserRequestDto;
import com.ssafy.ssuk.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true) // 읽기 전용
@RequiredArgsConstructor // final로 선언된 모든 필드에 대한 생성자
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    @Transactional
    public void createUser(RegisterUserRequestDto registerUserRequestDto) {
        User newUser = new User(
                registerUserRequestDto.getEmail(),
                registerUserRequestDto.getPassword(),
                registerUserRequestDto.getNickname());
        userRepository.insert(newUser);
    }

    @Override
    public User findByEmail(CheckEmailRequestDto checkEmailRequestDto) {
        User findUser = userRepository.findByEmail(checkEmailRequestDto.getEmail());
        return findUser;
    }
}
