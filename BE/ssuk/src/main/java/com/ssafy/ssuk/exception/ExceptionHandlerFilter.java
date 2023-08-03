package com.ssafy.ssuk.exception;

import com.ssafy.ssuk.exception.dto.CustomJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class ExceptionHandlerFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);
        } catch (CustomJwtException e) {
            log.debug("예외처리");
            String errorMessage = e.getMessage();
            Integer statusCode = 401;
            if (errorMessage.equals("Expired JWT Token"))
                statusCode = 409;
            HttpServletResponse httpServletResponse = response;
            httpServletResponse.setStatus(statusCode);
            httpServletResponse.getWriter().write(errorMessage);
            log.debug("응답완료");
        }
    }
}
