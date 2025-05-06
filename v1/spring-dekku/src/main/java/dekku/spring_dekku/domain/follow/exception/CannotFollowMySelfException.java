package dekku.spring_dekku.domain.follow.exception;

import dekku.spring_dekku.global.exception.BaseException;
import dekku.spring_dekku.global.status.ErrorCode;

public class CannotFollowMySelfException extends BaseException {

    public CannotFollowMySelfException(ErrorCode errorCode) {
        super(errorCode);
    }
}
