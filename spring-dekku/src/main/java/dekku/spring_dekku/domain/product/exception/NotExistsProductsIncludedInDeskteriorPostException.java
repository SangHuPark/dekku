package dekku.spring_dekku.domain.product.exception;

import dekku.spring_dekku.global.exception.BaseException;
import dekku.spring_dekku.global.status.ErrorCode;

public class NotExistsProductsIncludedInDeskteriorPostException extends BaseException {
    public NotExistsProductsIncludedInDeskteriorPostException(ErrorCode errorCode) {
        super(errorCode);
    }
}
