package com.a306.dekku.domain.board.exception;

import com.a306.dekku.global.exception.BaseException;
import com.a306.dekku.global.exception.ErrorCode;

public class NotExistBoardException extends BaseException {
    public NotExistBoardException() {
        super(ErrorCode.NOT_EXIST_POST);
    }
}
