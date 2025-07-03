package com.a306.dekku.external.redis.service.lock;

import java.util.concurrent.Callable;

public interface RedissonLockService {
    <T> T executeWithLock(String lockKey, Callable<T> task);
}
