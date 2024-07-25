package dekku.spring_dekku.global.util;

import dekku.spring_dekku.global.model.dto.Success;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseUtil {

    public static ResponseEntity ok(Success<?> result) {

        return new ResponseEntity<>(
                result,
                HttpStatus.OK
        );
    }

    public static ResponseEntity created(Success<?> result) {

        return new ResponseEntity<>(
                result,
                HttpStatus.CREATED
        );
    }

}