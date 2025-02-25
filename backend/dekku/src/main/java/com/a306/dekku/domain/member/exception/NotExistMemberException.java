package com.a306.dekku.domain.member.exception;

import com.a306.dekku.global.exception.BaseException;
import com.a306.dekku.global.exception.ErrorCode;

public class NotExistMemberException extends BaseException {
    public NotExistMemberException() {
        super(ErrorCode.NOT_EXIST_MEMBER);
    }
}
