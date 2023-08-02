package com.ssafy.ssuk.interceptor;


import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 일단 accessToken에서 id를 꺼내와야 하지만 아직 없으므로
 * accessToken에 유저 Id가 그냥 그대로 들어온다고 생각하고 했습니다.
 */
@Slf4j
public class LoginCheckInterceptor implements HandlerInterceptor {

    public static final String ACCESS_TOKEN = "accessToken";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String requestURI = request.getRequestURI();

        log.debug("인증 체크 인터셉터 실행 {}", requestURI);

        // 지금 현재는 그냥 유저아이디가 1, 2 이런식으로 들어온다고 가정함
        String accessToken = request.getHeader(ACCESS_TOKEN);

        if(accessToken == null){
            log.debug("에세스토큰 없네용");
            log.debug("그냥 userId 1로 할게요");
            request.setAttribute("userId", 1);
            request.setAttribute("userNickname", "쑥숙");
            return true;
        }
        request.setAttribute("userId",1);
        request.setAttribute("userNickname", "쑥숙");
        log.debug("userId={}", Integer.parseInt(accessToken));
        log.debug("JWT 인증 성공!!");

        return true;
    }
}