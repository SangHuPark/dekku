package dekku.spring_dekku.global.status;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    /**
     * {@code 400 Bad Request}
     */
    FAIL_TO_VALIDATE(HttpStatus.BAD_REQUEST, "잘못된 요청입니다."),
    FAIL_TO_FOLLOW(HttpStatus.BAD_REQUEST, "팔로우하지 않은 사용자입니다."),

    /**
     * {@code 401 Unauthorized}
     */
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다."),
    EMPTY_TOKEN(HttpStatus.UNAUTHORIZED, "토큰이 없습니다."),
    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "만료된 토큰입니다." ),

    /**
     * Code : 403
     * - Forbidden (요청한 자원에 대해 권한 없음)
     */
    FAIL_TO_LOGIN(HttpStatus.FORBIDDEN, "핸드폰 번호 또는 비밀번호를 잘못 입력했습니다."),
    FAIL_TO_DELETE_UNAUTHORIZED_COMMENT(HttpStatus.FORBIDDEN, "권한이 없는 댓글입니다."),

    /**
     * {@code 404 Not Found}
     */
    NOT_EXISTS_USER(HttpStatus.NOT_FOUND, "존재하지 않는 유저입니다."),
    NOT_EXISTS_PRODUCT(HttpStatus.NOT_FOUND, "존재하지 않는 상품입니다."),
    NOT_EXISTS_DESKTERIOR_POST(HttpStatus.NOT_FOUND, "존재하지 않는 게시글입니다."),
    NOT_EXISTS_COMMENT(HttpStatus.NOT_FOUND, "존재하지 않는 댓글입니다."),
    NOT_EXISTS_PRODUCT_INCLUDED_IN_DESKTERIOR_POST(HttpStatus.NOT_FOUND, "해당 게시물에 포함된 제품이 없습니다"),

    /**
     * {@code 409 Conflict}
     */
    CONFLICT_FOLLOW_USER(HttpStatus.CONFLICT, "이미 팔로우한 사용자입니다."),
    CONFLICT_UNLIKE_TO_POST(HttpStatus.CONFLICT, "이미 취소한 좋아요입니다."),
    CONFLICT_LIKE_TO_POST(HttpStatus.CONFLICT, "이미 좋아요한 게시글입니다.");

    private HttpStatus code;
    private String message;
}
