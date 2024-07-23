package dekku.spring_dekku.domain.member.controller;

import java.util.List;
import java.util.Objects;

import dekku.spring_dekku.domain.member.model.entity.Member;
import dekku.spring_dekku.domain.member.repository.MemberRepository;
import dekku.spring_dekku.domain.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Member APIS")
@RestController
@RequestMapping("/members")
public class MemberController {

	@Autowired
	private MemberService memberService;

	@GetMapping
	public List<Member> getAllMembers() {
		return memberService.getAllMembers();
	}

	@PostMapping
	public Member createMember(@RequestBody Member member) {
		return memberService.saveMember(member);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Member> getMemberById(@PathVariable Long id) {
		return memberService.getMemberById(id)
				.map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

//	@PutMapping("/{id}")
//	public ResponseEntity<Member> updateMember(@PathVariable Long id, @RequestBody Member memberDetails) {
//		Member updatedMember = memberService.updateMember(id, memberDetails);
//		if (updatedMember != null) {
//			return ResponseEntity.ok(updatedMember);
//		} else {
//			return ResponseEntity.notFound().build();
//		}
//	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteMember(@PathVariable Long id) {
		memberService.deleteMember(id);
		return ResponseEntity.ok().build();
	}
}
