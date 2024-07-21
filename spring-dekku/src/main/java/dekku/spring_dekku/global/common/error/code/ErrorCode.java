package dekku.spring_dekku.global.common.error.code;

import org.springframework.http.HttpStatus;

public enum ErrorCode {

	/**
	 * Code : 400
	 * - Bad Request
	 */
	FAIL_TO_VALIDATE(HttpStatus.BAD_REQUEST, "잘못된 요청입니다."),
	FAIL_TO_LOGOUT(HttpStatus.BAD_REQUEST, "로그아웃을 실패했습니다." ),

	/**
	 * Code : 401
	 * - UnAuthorized
	 */
	FAIL_TO_LOGIN(HttpStatus.UNAUTHORIZED, "이메일 또는 비밀번호를 잘못 입력했습니다.");

	/**
	 * Code : 403
	 * - Forbidden (요청한 자원에 대해 권한 없음)
	 */

	/**
	 * Code : 404
	 * - Not Found (존재하지 않는 자원임)
	 */

	/**
	 * Code : 500
	 * - INTERNAL_SERVER_ERROR (서버 오류)
	 */

	private final HttpStatus code;
	private final String message;

	private ErrorCode(HttpStatus code, String message) {
		this.code = code;
		this.message = message;
	}

	public HttpStatus getCode() {
		return code;
	}

	public String getMessage() {
		return message;
	}

}
