package com.ssafy.ssuk.utils.auth.oauth.kakao.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@ConfigurationProperties(prefix = "spring.security.oauth2.client.registration.kakao")
public class KakaoProperties {
    private String clientId;
    private String clientSecret;
    private String redirectUri;
    private String logoutRedirectUri;
    private String authorizationGrantType;
    private String clientAuthenticationMethod;

}