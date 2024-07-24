package dekku.spring_dekku.global.error;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum ErrorCode {

    /**
     * {@code 400 Bad Request}
     */
    FAIL_TO_VALIDATE(HttpStatus.BAD_REQUEST, "잘못된 요청입니다."),

    /**
     * {@code 401 Unauthorized}
     */
    FAIL_TO_LOGIN(HttpStatus.UNAUTHORIZED, "이메일 또는 비밀번호를 잘못 입력했습니다.");

    private final HttpStatus code;
    private final String message;
}
