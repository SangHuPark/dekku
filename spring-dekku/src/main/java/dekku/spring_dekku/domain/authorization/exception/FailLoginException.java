package dekku.spring_dekku.domain.authorization.exception;

import com.trip.global.common.error.code.ErrorCode;
import com.trip.global.common.error.exeption.BaseException;

public class FailLoginException extends BaseException {

	public FailLoginException(ErrorCode errorCode) {
		super(errorCode);
	}

}
