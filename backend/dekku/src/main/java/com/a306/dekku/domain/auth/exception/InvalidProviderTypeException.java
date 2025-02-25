package com.a306.dekku.domain.auth.exception;

import com.a306.dekku.global.exception.BaseException;
import com.a306.dekku.global.exception.ErrorCode;
import lombok.Getter;

@Getter
public class InvalidProviderTypeException extends BaseException {

    public InvalidProviderTypeException() {
        super(ErrorCode.INVALID_PROVIDER_TYPE);
    }
}
