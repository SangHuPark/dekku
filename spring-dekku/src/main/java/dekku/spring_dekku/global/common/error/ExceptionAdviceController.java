package dekku.spring_dekku.global.common.error;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import dekku.spring_dekku.global.common.error.code.ErrorCode;
import dekku.spring_dekku.global.common.error.exeption.BaseException;
import dekku.spring_dekku.global.common.model.dto.ResponseDto;
import dekku.spring_dekku.global.util.ResponseUtil;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static dekku.spring_dekku.global.common.constant.Format.VALIDATED_ERROR_RESULT;
import static dekku.spring_dekku.global.common.constant.Format.VALID_ERROR_RESULT;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

@Slf4j
@RestControllerAdvice
public class ExceptionAdviceController {

	@ExceptionHandler({BaseException.class})
	protected ResponseEntity<String> handleBaseException(BaseException exception) {

		ResponseDto<String> result = new ResponseDto<>();
		result.setResult(exception.getErrorCode().getMessage());

		log.error("Error occurred time : [time={}]", result.getTimestamp());
		log.error("Error occurred in controller advice : [id={}]", result.getTrackingId());

		return ResponseUtil.error(result, exception.getErrorCode());

	}

	@ExceptionHandler({MethodArgumentNotValidException.class})
	protected ResponseEntity<List<String>> handleValidException(MethodArgumentNotValidException exception) {

		ResponseDto<List<String>> result = new ResponseDto<>();
		List<String> errors = new ArrayList<>();
		BindingResult bindingResult = exception.getBindingResult();

		for (FieldError fieldError : bindingResult.getFieldErrors()) {
			errors.add
				(String
					.format(
						VALID_ERROR_RESULT, fieldError.getDefaultMessage(), fieldError.getField(), fieldError.getRejectedValue()
					)
				);
		}

		result.setResult(errors);
		return ResponseUtil.error(result, ErrorCode.FAIL_TO_VALIDATE);

	}

	@ExceptionHandler({ConstraintViolationException.class})
	protected ResponseEntity<List<String>> handleValidatedException(ConstraintViolationException e) {

		ResponseDto<List<String>> result = new ResponseDto<>();
		List<String> errors = new ArrayList<>();
		Set<ConstraintViolation<?>> constraintViolations = e.getConstraintViolations();
		constraintViolations.stream()
			.forEach(constraintViolation -> {
				errors.add(
					String
						.format(VALIDATED_ERROR_RESULT,
							constraintViolation.getMessage(),
							constraintViolation.getInvalidValue())

				);
			});

		result.setResult(errors);
		return ResponseUtil.error(result, ErrorCode.FAIL_TO_VALIDATE);

	}

}