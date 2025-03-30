package com.a306.dekku.domain.auth.jwt.exception;

import com.a306.dekku.global.exception.BaseException;
import com.a306.dekku.global.exception.ErrorCode;
import lombok.Getter;

@Getter
public class FailToIssueTokenException extends BaseException {

    public FailToIssueTokenException() {
        super(ErrorCode.FAIL_TO_ISSUE_TOKEN);
    }
}
