package dekku.spring_dekku.domain.comment.exception;

import dekku.spring_dekku.global.exception.BaseException;
import dekku.spring_dekku.global.status.ErrorCode;

public class CommentNotFoundException extends BaseException {
    public CommentNotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }
}
