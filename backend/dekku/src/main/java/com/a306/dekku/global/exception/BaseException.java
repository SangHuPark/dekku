package com.a306.dekku.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public abstract class BaseException extends RuntimeException {

    private final ErrorCode errorCode;

}
