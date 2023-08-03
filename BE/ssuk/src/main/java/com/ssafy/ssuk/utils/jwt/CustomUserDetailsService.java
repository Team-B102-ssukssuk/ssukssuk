package com.ssafy.ssuk.utils.jwt;

import com.ssafy.ssuk.user.domain.User;
import com.ssafy.ssuk.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), user.getAuthorities());
//        return userRepository.findByEmail(email)
//                .map(this::createUserDetails)
//                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
    }

    // 해당하는 User의 데이터가 존재하면 UserDetails 객체로 만들어서 리턴
//    private UserDetails createUserDetails(User user) {
//        org.springframework.security.core.userdetails.User.UserBuilder roles = org.springframework.security.core.userdetails.User.builder()
//                .username(user.getEmail())
//                .password(passwordEncoder.encode(user.getPassword()))
//                .roles();
//
//        UserDetails build = roles
//                .build();
//
//        return build;
//    }

}
