package com.ssafy.ssuk.user.service;

import com.ssafy.ssuk.user.domain.User;
import com.ssafy.ssuk.user.dto.request.CheckEmailRequestDto;
import com.ssafy.ssuk.user.dto.request.LoginRequestDto;
import com.ssafy.ssuk.user.dto.request.RegisterUserRequestDto;
import com.ssafy.ssuk.user.repository.UserRepository;
import com.ssafy.ssuk.utils.jwt.JwtTokenProvider;
import com.ssafy.ssuk.utils.jwt.TokenInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true) // 읽기 전용
@RequiredArgsConstructor // final로 선언된 모든 필드에 대한 생성자
@Slf4j
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    @Transactional
    public void createUser(RegisterUserRequestDto registerUserRequestDto) {
        User newUser = new User(
                registerUserRequestDto.getEmail(),
                registerUserRequestDto.getPassword(),
                registerUserRequestDto.getNickname());
        userRepository.save(newUser);
    }

    @Override
    public Optional<User> findByEmail(CheckEmailRequestDto checkEmailRequestDto) {
        Optional<User> findUser = userRepository.findByEmail(checkEmailRequestDto.getEmail());
        return findUser;
    }

    @Override
    @Transactional
    public TokenInfo login(LoginRequestDto loginRequestDto) {
        log.debug("11111");
        // 1. Login email/password를 기반으로 Authentication 객체 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(), loginRequestDto.getPassword());

        log.debug("22222");
        // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        log.debug("333333");
        // 3. 인증 정보를 기반으로 JWT 생성
        TokenInfo tokenInfo = jwtTokenProvider.createToken(authentication);

        return tokenInfo;
    }


}
