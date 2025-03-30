package com.a306.dekku.external.redis.service;

import java.util.Optional;

public interface RedisKeyValueService<K, T> {

    void save(K key, T value);
    Optional<T> findByKey(K key);
    Boolean deleteByKey(K key);

}
