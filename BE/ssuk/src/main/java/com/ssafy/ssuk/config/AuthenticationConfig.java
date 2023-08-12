package com.ssafy.ssuk.config;

import com.ssafy.ssuk.exception.ExceptionHandlerFilter;
import com.ssafy.ssuk.utils.auth.jwt.JwtAuthenticationFilter;
import com.ssafy.ssuk.utils.auth.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.Filter;

@Slf4j
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class AuthenticationConfig {

    private final JwtTokenProvider jwtTokenProvider;
    private final ExceptionHandlerFilter exceptionHandlerFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .httpBasic().disable()
                .csrf().disable()
                .cors().and()
                .authorizeRequests()
                // 권한이 필요하지 않은 넓은 범위의 규칙
                .antMatchers("/").permitAll() // 메인 페이지 접근 허용
                .antMatchers("/auth/**").permitAll() // 회원가입 및 로그인에 대해 접근 허용
                .antMatchers("/stomp/**").permitAll() // 모든 센서값 요청에 대해 접근 허용
                .antMatchers("/sensor/upload").permitAll() // 라즈베리에서 날라오는 이미지 변경 요청
//                .antMatchers("/kakao/**").permitAll()
                // 그 외의 모든 요청에 대해 인증 필요
                .anyRequest().authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // JWT 사용하는 경우
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore((Filter) exceptionHandlerFilter, JwtAuthenticationFilter.class);
        return httpSecurity.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
