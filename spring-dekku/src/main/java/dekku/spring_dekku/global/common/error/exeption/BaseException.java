package dekku.spring_dekku.global.common.error.exeption;

import dekku.spring_dekku.global.common.error.code.ErrorCode;

public class BaseException extends RuntimeException {

	private final ErrorCode errorCode;

	public BaseException(ErrorCode errorCode) {
		this.errorCode = errorCode;
	}

	public ErrorCode getErrorCode() {
		return errorCode;
	}

}
