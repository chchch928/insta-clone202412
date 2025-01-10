package com.example.instagramclone.jwt;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter @Setter
@Configuration
// jwt로 시작하는 프로퍼티들을 불러옴
@ConfigurationProperties(prefix ="jwt")
// application.yml 에서 jwt 관련 프로퍼티 값을 읽어오는 클래스
public class JwtProperties {
    private String secretKey;
    private long accessTokenValidityTime;
    private long refreshTokenValidityTime;
}
