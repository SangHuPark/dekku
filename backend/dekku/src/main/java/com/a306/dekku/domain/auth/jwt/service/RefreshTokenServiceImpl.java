package com.a306.dekku.domain.auth.jwt.service;

import com.a306.dekku.domain.auth.jwt.model.dto.JwtProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

import static com.a306.dekku.global.constant.JwtKey.REFRESH_TOKEN_KEY_PREFIX;

@Slf4j
@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private final RedisTemplate<String, String> redisTemplate;
    private final JwtProperties jwtProperties;

    @Override
    public void save(String key, String value) {
        redisTemplate.opsForValue().set(
                String.format(REFRESH_TOKEN_KEY_PREFIX, key),
                value,
                jwtProperties.expiration().refresh(),
                TimeUnit.SECONDS
        );
    }

    @Override
    public Optional<String> findByKey(String key) {
        return Optional.ofNullable(
                redisTemplate.opsForValue().get(String.format(REFRESH_TOKEN_KEY_PREFIX, key))
        );
    }

    @Override
    public Boolean deleteByKey(String key) {
        return redisTemplate.delete(String.format(REFRESH_TOKEN_KEY_PREFIX, key));
    }
}
