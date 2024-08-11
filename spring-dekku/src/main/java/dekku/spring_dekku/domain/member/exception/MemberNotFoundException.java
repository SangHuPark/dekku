package dekku.spring_dekku.domain.member.exception;

import dekku.spring_dekku.global.exception.BaseException;
import dekku.spring_dekku.global.status.ErrorCode;

public class MemberNotFoundException extends BaseException {
    public MemberNotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }
}
