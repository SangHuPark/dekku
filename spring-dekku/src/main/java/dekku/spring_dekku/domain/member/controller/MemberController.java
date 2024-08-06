package dekku.spring_dekku.domain.member.controller;

import java.util.List;

import dekku.spring_dekku.domain.member.model.dto.MemberUpdateDto;
import dekku.spring_dekku.domain.member.model.entity.Member;
import dekku.spring_dekku.domain.member.service.oauth2.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "사용자 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class MemberController {

	private final MemberService memberService;

	@GetMapping
	public List<Member> getAllMembers() {
		return memberService.getAllMembers();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Member> getMemberById(@PathVariable Long id) {

		return memberService.getMemberById(id)
				.map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PatchMapping("/update")
	public ResponseEntity<Void> updateUser(@RequestHeader(value="Access") String token, @RequestBody MemberUpdateDto requestDto) throws Exception {

		memberService.updateUser(requestDto, token);
		return ResponseEntity.ok().build();
	}
//
//	@DeleteMapping("/{id}")
//	public ResponseEntity<Void> deleteMember(@PathVariable Long id) {
//		memberService.deleteMember(id);
//		return ResponseEntity.ok().build();
//	}

	@DeleteMapping("/delete")
	public ResponseEntity<?> delete(@RequestHeader(value="access") String token) {
		memberService.delete(token);
		ResponseCookie responseCookie = ResponseCookie.from("refresh-token", null)
				.maxAge(0)
				.path("/")
				.build();
		return ResponseEntity.status(HttpStatus.OK).header(HttpHeaders.SET_COOKIE, responseCookie.toString())
				.body(null);
	}
}
