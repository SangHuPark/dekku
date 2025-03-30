package com.a306.dekku.domain.auth.jwt.exception;

import com.a306.dekku.global.exception.BaseException;
import com.a306.dekku.global.exception.ErrorCode;

public class ExpiredTokenException extends BaseException {

    public ExpiredTokenException() {
        super(ErrorCode.UNTRUSTWORTHY_TOKEN);
    }

}
