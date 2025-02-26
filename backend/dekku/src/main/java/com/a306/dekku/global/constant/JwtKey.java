package com.a306.dekku.global.constant;

public class JwtKey {

    public static final String TOKEN_PREFIX = "Bearer ";  // JWT 인증 헤더의 토큰 접두어
    public static final String ACCESS_TOKEN_KEY = "access_token";  // 액세스 토큰 키 이름
    public static final String REFRESH_TOKEN_KEY = "refresh_token";  // 리프레쉬 토큰 키 이름
    /**
     * JWT - 리프레쉬 토큰을 Redis에 저장할 때 사용되는 키의 prefix.
     * %s 자리에 사용자의 providerId가 들어감.
     * 예시: "member:1234:refresh_token:" (1234는 providerId)
     */
    public static final String REFRESH_TOKEN_KEY_PREFIX = "member:%s:refresh_token:";

}
