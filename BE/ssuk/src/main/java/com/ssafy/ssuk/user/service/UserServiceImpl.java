package com.ssafy.ssuk.user.service;

import com.ssafy.ssuk.exception.dto.CustomException;
import com.ssafy.ssuk.exception.dto.ErrorCode;
import com.ssafy.ssuk.user.domain.Role;
import com.ssafy.ssuk.user.domain.User;
import com.ssafy.ssuk.user.dto.request.CheckEmailRequestDto;
import com.ssafy.ssuk.user.dto.request.LoginRequestDto;
import com.ssafy.ssuk.user.dto.request.RegisterUserRequestDto;
import com.ssafy.ssuk.user.dto.request.UpdatePasswordDto;
import com.ssafy.ssuk.user.repository.RoleRepository;
import com.ssafy.ssuk.user.repository.UserRepository;
import com.ssafy.ssuk.utils.jwt.JwtTokenProvider;
import com.ssafy.ssuk.utils.jwt.TokenInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true) // 읽기 전용
@RequiredArgsConstructor // final로 선언된 모든 필드에 대한 생성자
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void createUser(RegisterUserRequestDto registerUserRequestDto) {
        String encodePassword = passwordEncoder.encode(registerUserRequestDto.getPassword());
        log.debug("newPW={}",encodePassword);
        log.debug("length={}",encodePassword.getBytes().length);
        User newUser = new User(
                registerUserRequestDto.getEmail(),
                encodePassword,
                registerUserRequestDto.getNickname());
        Role userRole = roleRepository.findByRolename("USER");
        newUser.addRole(userRole);
        userRepository.save(newUser);

    }

    @Override
    @Transactional
    public TokenInfo login(LoginRequestDto loginRequestDto) {
        // 1. Login email/password를 기반으로 Authentication 객체 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(), loginRequestDto.getPassword());

        // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
        try {
            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

            // 3. 인증 정보를 기반으로 JWT 생성
            // 3-1. JWT에 담을 유저 정보 추출
            Optional<User> user = userRepository.findByEmail(loginRequestDto.getEmail());

            if (user.isPresent()) {
                User loginUser = user.get();
                Integer userId = loginUser.getId();
                String userNickname = loginUser.getNickname();
                // 3-2. 유저 정보 가져가서 JWT 생성
                TokenInfo tokenInfo = jwtTokenProvider.createToken(authentication, userId, userNickname);

                return tokenInfo;
            }
            return null;
        } catch (BadCredentialsException e) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }

    }

    @Override
    public Optional<User> findByEmail(CheckEmailRequestDto checkEmailRequestDto) {
        Optional<User> findUser = userRepository.findByEmail(checkEmailRequestDto.getEmail());
        return findUser;
    }

    @Override
    public Optional<User> findByNickname(String nickname) {
        Optional<User> findUser = userRepository.findByNickname(nickname);
        return findUser;
    }

    @Override
    public User findById(Integer userId) {
        Optional<User> user = userRepository.findById(userId);

        if (user.isPresent()) {
            log.info("service : " + user.get().getId());
            return user.get();
        } else
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
    }

    @Override
    @Transactional
    public void updatePassword(UpdatePasswordDto updatePasswordDto) {
        String encodePassword = passwordEncoder.encode(updatePasswordDto.getPassword());
        userRepository.updatePassword(updatePasswordDto.getEmail(), encodePassword);
    }

}
