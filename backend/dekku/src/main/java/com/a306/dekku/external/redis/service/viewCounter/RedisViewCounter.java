package com.a306.dekku.external.redis.service.viewCounter;

import java.util.Map;
import java.util.Optional;

public interface RedisViewCounter {
    long increase(String key);

    Optional<String> get(String key);

    void set(String key, String value);


    void save(String hash, Long key, Long value);

    Map<Object, Object> findByHash(String hash);

    Optional<Long> findByKey(String hash, Long key);

    void deleteByKey(String hash, Long key);

    Long increment(String hash, Long key, Long value);
}
