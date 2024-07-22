package dekku.spring_dekku.domain.member.controller;

import java.util.List;
import java.util.Objects;

import dekku.spring_dekku.domain.member.model.entity.Member;
import dekku.spring_dekku.domain.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import com.trip.domain.member.model.DuplicationStatus;
//import com.trip.domain.member.model.dto.request.MemberSignUpReqDto;
//import com.trip.domain.member.model.entity.Member;
//import com.trip.domain.member.service.MemberService;
//import com.trip.global.common.model.dto.ResponseDto;
//import com.trip.global.util.ResponseUtil;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Member APIS")
@RestController
@RequestMapping("/members")
public class MemberController {

	@Autowired
	private MemberRepository memberRepository;

	@GetMapping
	public List<Member> getAllMembers() {
//        System.out.println("getAllMembers");
//        List<Member> mems = memberRepository.findAll();
//        System.out.println(mems);
//        System.out.println(mems.size());
//        System.out.println("after getAllMembers");
		return memberRepository.findAll();
	}

	@PostMapping
	public Member createMember(@RequestBody Member member) {
		return memberRepository.save(member);
	}

	@GetMapping("/{id}")
	public Member getMemberById(@PathVariable Long id) {
		return memberRepository.findById(id).orElse(null);
	}

	@PutMapping("/{id}")
	public Member updateMember(@PathVariable Long id, @RequestBody Member memberDetails) {
		Member member = memberRepository.findById(id).orElse(null);
		if (member != null) {
			member.setEmail(memberDetails.getEmail());
			member.setPassword(memberDetails.getPassword());
			member.setName(memberDetails.getName());
			member.setNickname(memberDetails.getNickname());
			member.setPhone(memberDetails.getPhone());
			return memberRepository.save(member);
		} else {
			return null;
		}
	}

	@DeleteMapping("/{id}")
	public void deleteMember(@PathVariable Long id) {
		memberRepository.deleteById(id);
	}


//	private final MemberService memberService;
//
//	@Autowired
//	public MemberController(MemberService memberService) {
//		this.memberService = memberService;
//	}
//
//	@Operation(summary = "회원가입")
//	@PostMapping("/signup")
//	public ResponseEntity signUp(@RequestBody MemberSignUpReqDto req) {
//
//		ResponseDto result = new ResponseDto<>();
//		boolean isSuccess = memberService.signUp(req);
//
//		result.setResult(isSuccess);
//		return ResponseUtil.created(result);
//
//	}
//
//	@Operation(summary = "이메일 중복 확인")
//	@GetMapping("/email/{email}")
//	public ResponseEntity checkDuplicationEmail(@PathVariable(name = "email") String email) {
//
//		ResponseDto result = new ResponseDto<>();
//		result.setResult(DuplicationStatus.EXIST);
//		Member findMember = memberService.checkDuplicationEmail(email);
//
//		if (Objects.isNull(findMember)) {
//			result.setResult(DuplicationStatus.NOT_EXIST);
//			return ResponseEntity.ok(result);
//		}
//
//		return ResponseEntity.ok(result);
//
//	}
//
//	@Operation(summary = "닉네임 중복 확인")
//	@GetMapping("/nickName/{nickName}")
//	public ResponseEntity checkDuplicationNickName(@PathVariable(name = "nickName") String nickName) {
//
//		ResponseDto result = new ResponseDto<>();
//		result.setResult(DuplicationStatus.EXIST);
//		Member findMember = memberService.checkDuplicationNickName(nickName);
//
//		if (Objects.isNull(findMember)) {
//			result.setResult(DuplicationStatus.NOT_EXIST);
//			return ResponseEntity.ok(result);
//		}
//
//		return ResponseEntity.ok(result);
//
//	}

}
