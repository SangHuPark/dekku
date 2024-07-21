package dekku.spring_dekku.domain.authorization.controller;

import static com.trip.global.common.error.code.ErrorCode.*;

import java.util.Objects;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trip.domain.authorization.exception.FailLoginException;
import com.trip.domain.authorization.exception.FailLogoutException;
import com.trip.domain.authorization.model.dto.response.LoginReqDto;
import com.trip.domain.authorization.model.dto.response.LogoutReqDto;
import com.trip.domain.authorization.service.AuthorizationService;
import com.trip.domain.member.model.entity.Member;
import com.trip.global.common.model.dto.ResponseDto;
import com.trip.global.util.ResponseUtil;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Authorization APIS")
@RestController
@RequestMapping("/auths")
public class AuthorizationController {

	private final AuthorizationService authorizationService;

	public AuthorizationController(AuthorizationService authorizationService) {
		this.authorizationService = authorizationService;
	}

	@Operation(summary = "로그인")
	@PostMapping("/login")
	public ResponseEntity login(@RequestBody LoginReqDto req) {
		ResponseDto response = new ResponseDto<>();
		Member findMember = authorizationService.login(req);
		if (Objects.isNull(findMember)) {
			throw new FailLoginException(FAIL_TO_LOGIN);
		}

		response.setResult(findMember);
		return ResponseUtil.ok(response);
	}

	@Operation(summary = "로그아웃")
	@PostMapping("/logout")
	public ResponseEntity logout(@RequestBody LogoutReqDto req) {
		ResponseDto response = new ResponseDto<>();
		Member logoutMember = authorizationService.logout(req);

		if (Objects.isNull(logoutMember)) {
			throw new FailLogoutException(FAIL_TO_LOGOUT);
		}

		return ResponseUtil.ok();
	}

}
