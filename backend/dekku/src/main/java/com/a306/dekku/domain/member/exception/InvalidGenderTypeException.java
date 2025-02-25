package com.a306.dekku.domain.member.exception;

import com.a306.dekku.global.exception.BaseException;
import com.a306.dekku.global.exception.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public class InvalidGenderTypeException extends BaseException {

    public InvalidGenderTypeException() {
        super(ErrorCode.INVALID_GENDER_TYPE);
    }

}
