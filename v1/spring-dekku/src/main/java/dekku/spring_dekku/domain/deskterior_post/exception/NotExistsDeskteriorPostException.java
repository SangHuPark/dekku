package dekku.spring_dekku.domain.deskterior_post.exception;

import dekku.spring_dekku.global.exception.BaseException;
import dekku.spring_dekku.global.status.ErrorCode;

public class NotExistsDeskteriorPostException extends BaseException {
    public NotExistsDeskteriorPostException(ErrorCode errorCode) {
        super(errorCode);
    }
}
