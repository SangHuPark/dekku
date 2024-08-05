package dekku.spring_dekku.global.handler;

import dekku.spring_dekku.global.exception.BaseException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.net.URI;

@Slf4j
@RestControllerAdvice
public class ExceptionAdviceHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({BaseException.class})
    protected ResponseEntity<ErrorResponse> handleBaseException(BaseException exception, WebRequest request) {

        return ResponseEntity
                .status(exception.getErrorCode().getCode())
                .body(ErrorResponse
                        .builder(exception, exception.getErrorCode().getCode(), exception.getMessage())
                        .instance(URI.create(
                                ((ServletWebRequest) request)
                                        .getRequest()
                                        .getRequestURI()))
                        .build());
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException exception,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {

        return ResponseEntity
                .status(status)
                .body(ErrorResponse
                        .builder(exception, status, exception.getFieldError().getDefaultMessage())
                        .instance(URI.create(
                                ((ServletWebRequest) request)
                                    .getRequest()
                                    .getRequestURI()))
                        .build());
    }


}
