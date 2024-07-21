package dekku.spring_dekku.domain.member.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trip.domain.member.model.dto.request.MemberSignUpReqDto;
import com.trip.domain.member.model.entity.Member;
import com.trip.domain.member.repository.MemberRepository;

@Service
public class MemberServiceImpl implements MemberService {

	private final MemberRepository memberRepository;

	@Autowired
	public MemberServiceImpl(MemberRepository memberRepository) {
		this.memberRepository = memberRepository;
	}

	@Override
	public boolean signUp(MemberSignUpReqDto req) {
		return memberRepository.insertMember(req);
	}

	@Override
	public Member checkDuplicationEmail(String email) {
		return memberRepository.selectByEmail(email);
	}

	@Override
	public Member checkDuplicationNickName(String nickName) {
		return memberRepository.selectByNickName(nickName);
	}

}
