package com.ssafy.ssuk.utils.auth.jwt;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final static String whiteList = "/auth";

    @Override
    protected void doFilterInternal (HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.debug("uri={}", request.getRequestURI());
        if (request.getRequestURI().startsWith(whiteList)) {
            filterChain.doFilter(request, response);
            return;
        }
        // 1. 요청 헤더에서 JWT 토큰 추출
        log.debug("토큰 추출");
        String accesstoken = resolveToken((HttpServletRequest) request);
        log.debug("token={}",accesstoken);

        // 2. 토큰 유효성 검사

        log.debug("유효성 검사");
        if (accesstoken != null && jwtTokenProvider.validateToken(accesstoken)) {
            // 토큰이 유효할 경우 토큰에서 Authentication 객체를 가지고 와서 SecurityContext에 저장
            log.debug("권한 추출");
            Authentication authentication = jwtTokenProvider.getAuthentication(accesstoken, request);
            log.debug("허가");
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.debug("허가완료");
        }
        filterChain.doFilter(request, response);
    }

    // 헤더에서 토큰 추출
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        log.debug("bearerToken={}",bearerToken);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            return bearerToken.substring(7);
        }
        return null;
    }

}
