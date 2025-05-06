package dekku.spring_dekku.global.exception;

import dekku.spring_dekku.global.status.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class BaseException extends RuntimeException {

    private final ErrorCode errorCode;

}
