package com.a306.dekku.domain.auth.jwt.exception;

import com.a306.dekku.global.exception.BaseException;
import com.a306.dekku.global.exception.ErrorCode;

public class UntrustworthyTokenException extends BaseException {

    public UntrustworthyTokenException() {
        super(ErrorCode.UNTRUSTWORTHY_TOKEN);
    }

}
