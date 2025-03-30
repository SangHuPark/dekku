package com.a306.dekku.domain.auth.jwt.service;

import com.a306.dekku.external.redis.service.RedisKeyValueService;

public interface RefreshTokenService extends RedisKeyValueService<String, String> {
}
