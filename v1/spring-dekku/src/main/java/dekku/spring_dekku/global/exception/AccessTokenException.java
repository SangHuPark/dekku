package dekku.spring_dekku.global.exception;

import dekku.spring_dekku.global.status.ErrorCode;

public class AccessTokenException extends BaseException {
    public AccessTokenException(ErrorCode errorCode) {
        super(errorCode);
    }
}
