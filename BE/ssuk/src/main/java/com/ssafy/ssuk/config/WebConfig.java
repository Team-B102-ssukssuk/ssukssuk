package com.ssafy.ssuk.config;

//import com.ssafy.ssuk.interceptor.LoginCheckInterceptor;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
///**
// * 유저 ID를 토큰에서 꺼내오니깐
// * 인터셉터에서 유저 ID를 requestAttribute에 추가하기 위해서
// * 임시로 만들었습니다.
// */
//@Configuration
//public class WebConfig implements WebMvcConfigurer {
//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(new LoginCheckInterceptor())
//                .order(1)
//                .addPathPatterns("/**")
//                .excludePathPatterns("/user/login",
//                        "/user/signup",
//                        "/user/check/nickname/*",
//                        "/email/authentication/*",
//                        "/check/email/{email}",
//                        "/login/kakao");
//    }
//
//}
