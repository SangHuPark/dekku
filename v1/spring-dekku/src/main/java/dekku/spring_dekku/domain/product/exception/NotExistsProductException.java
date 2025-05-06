package dekku.spring_dekku.domain.product.exception;

import dekku.spring_dekku.global.exception.BaseException;
import dekku.spring_dekku.global.status.ErrorCode;

public class NotExistsProductException extends BaseException {

    public NotExistsProductException(ErrorCode errorCode) {
        super(errorCode);
    }
}
