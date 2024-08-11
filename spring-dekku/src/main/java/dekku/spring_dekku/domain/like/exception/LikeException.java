package dekku.spring_dekku.domain.like.exception;

import dekku.spring_dekku.global.exception.BaseException;
import dekku.spring_dekku.global.status.ErrorCode;

public class LikeException extends BaseException {
    public LikeException(ErrorCode errorCode) {
        super(errorCode);
    }
}
