package com.ssafy.ssuk.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.ssuk.exception.dto.CustomJwtException;
import com.ssafy.ssuk.exception.dto.ErrorCode;
import com.ssafy.ssuk.exception.dto.ErrorResponseEntity;
import lombok.Data;
import lombok.Getter;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.IOException;

@Slf4j
@Component
public class ExceptionHandlerFilter extends OncePerRequestFilter {

    @SneakyThrows
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            filterChain.doFilter(request, response);
        } catch (CustomJwtException e) {
            log.debug("예외처리");
            setErrorResponse(response, e.getErrorCode());
            log.debug("응답완료");
        }
    }

    private void setErrorResponse(HttpServletResponse response, ErrorCode code) {
        ObjectMapper objectMapper = new ObjectMapper();
        response.setStatus(code.getHttpStatus().value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE + "; charset=utf-8");
        ErrorResponseEntity errorResponseEntity = new ErrorResponseEntity(
                code.getHttpStatus().value(),
                code.name(),
                code.getMessage());
        try {
            response.getWriter().write(objectMapper.writeValueAsString(errorResponseEntity));
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    @Data
    public static class ErrorResponse {
        private int statusCode;
        private String statusName;
        private String message;

    }


}
