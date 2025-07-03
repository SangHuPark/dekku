package com.a306.dekku.external.redis.service.viewCounter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Component
@Slf4j
public class RedisViewCounterImpl implements RedisViewCounter {

    private final RedisTemplate<String, String> redisTemplate;

    @Override
    public long increase(String key) {
        return redisTemplate.opsForValue().increment(key);
    }

    @Override
    public Optional<String> get(String key) {
        return Optional.ofNullable(redisTemplate.opsForValue().get(key));
    }

    @Override
    public void set(String key, String value) {
        redisTemplate.opsForValue().set(key, value);
    }

    @Override
    public void save(String hash, Long key, Long value) {
        redisTemplate.opsForHash().put(hash, key.toString(), value);
    }

    @Override
    public Map<Object, Object> findByHash(String hash) {
        return redisTemplate.opsForHash().entries(hash);
    }

    @Override
    public Optional<Long> findByKey(String hash, Long key) {
        Number value = (Number) redisTemplate.opsForHash().get(hash, key.toString());
        return Optional.ofNullable(value).map(Number::longValue);
    }

    @Override
    public void deleteByKey(String hash, Long key) {
        redisTemplate.opsForHash().delete(hash, key.toString());
    }

    @Override
    public Long increment(String hash, Long key, Long value) {
        return redisTemplate.opsForHash().increment(hash, key.toString(), value);
    }

}
