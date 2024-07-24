package dekku.spring_dekku.global.response;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public enum SuccessCode {

    OK(HttpStatus.OK, "요청을 성공하였습니다."),
    CREATED(HttpStatus.CREATED, "생성을 성공하였습니다.");

    private final HttpStatus code;
    private final String message;
}
