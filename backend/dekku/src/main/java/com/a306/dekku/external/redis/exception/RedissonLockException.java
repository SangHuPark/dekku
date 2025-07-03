package com.a306.dekku.external.redis.exception;

import com.a306.dekku.global.exception.BaseException;
import com.a306.dekku.global.exception.ErrorCode;

public class RedissonLockException extends BaseException {
    public RedissonLockException() {
        super(ErrorCode.FAIL_TO_ACQUIRE_LOCK);
    }
}
