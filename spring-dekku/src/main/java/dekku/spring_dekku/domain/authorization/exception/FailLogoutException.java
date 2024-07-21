package dekku.spring_dekku.domain.authorization.exception;

import com.trip.global.common.error.code.ErrorCode;
import com.trip.global.common.error.exeption.BaseException;

public class FailLogoutException extends BaseException {
	public FailLogoutException(ErrorCode errorCode) {
		super(errorCode);
	}
}
