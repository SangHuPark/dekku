package com.a306.dekku.global.constant;

public class StringFormat {
    public static final String VALID_ERROR_RESULT = "{message: '%s'}, {field: '%s'}, {input: '%s'}";
    public static final String VALIDATED_ERROR_RESULT = "{message: '%s'}, {input: '%s'}";
    public static final String TIMESTAMP_FORMAT = "yyyy-MM-dd HH:mm:ss";

    // redis 관련
    public static final String REDIS_VIEW_KEY_PREFIX = "board:viewcount:";
    public static final String REDIS_LOCK_PREFIX = "lock:viewcount:";
}
