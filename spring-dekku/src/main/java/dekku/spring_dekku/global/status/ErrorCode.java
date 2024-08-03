package dekku.spring_dekku.global.status;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    /**
     * {@code 400 Bad Request}
     */
    FAIL_TO_VALIDATE(HttpStatus.BAD_REQUEST, "잘못된 요청입니다."),

    /**
     * {@code 401 Unauthorized}
     */
    FAIL_TO_LOGIN(HttpStatus.UNAUTHORIZED, "이메일 또는 비밀번호를 잘못 입력했습니다."),

    /**
     * {@code 404 Not Found}
     */
    NOT_EXISTS_USER(HttpStatus.NOT_FOUND, "존재하지 않는 유저입니다."),
    NOT_EXISTS_PRODUCT(HttpStatus.NOT_FOUND, "존재하지 않는 상품입니다.");

    private HttpStatus code;
    private String message;
}
