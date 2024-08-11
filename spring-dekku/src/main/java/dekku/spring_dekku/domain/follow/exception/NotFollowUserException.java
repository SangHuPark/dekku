package dekku.spring_dekku.domain.follow.exception;

import dekku.spring_dekku.global.exception.BaseException;
import dekku.spring_dekku.global.status.ErrorCode;

public class NotFollowUserException extends BaseException {
    public NotFollowUserException(ErrorCode errorCode) {
        super(errorCode);
    }
}
