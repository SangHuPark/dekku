package com.a306.dekku.domain.auth.jwt.model.dto;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "jwt")
public record JwtProperties(
        String secret,
        Expiration expiration
) {
    public record Expiration(long access, long refresh) { }
}
