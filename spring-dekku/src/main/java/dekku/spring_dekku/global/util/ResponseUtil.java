package dekku.spring_dekku.global.util;

import dekku.spring_dekku.global.common.error.code.ErrorCode;
import dekku.spring_dekku.global.common.model.dto.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseUtil {

    public static ResponseEntity ok() {
        return new ResponseEntity<>(
            HttpStatus.OK
        );
    }

    public static ResponseEntity ok(ResponseDto<?> result) {
        return new ResponseEntity<>(
                result,
                HttpStatus.OK
        );
    }

    public static ResponseEntity created(ResponseDto<?> result) {
        return new ResponseEntity<>(
                result,
                HttpStatus.CREATED
        );
    }

    public static ResponseEntity noContent() {
        return new ResponseEntity<>(
            HttpStatus.NO_CONTENT
        );
    }
    
    public static ResponseEntity noContent(ResponseDto<?> result) {
        return new ResponseEntity<>(
                result,
                HttpStatus.NO_CONTENT
        );
    }

    public static ResponseEntity error(ResponseDto<?> result, ErrorCode code) {
        return new ResponseEntity<>(
                result,
                code.getCode()
        );
    }

}