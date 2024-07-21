package dekku.spring_dekku.domain.authorization.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trip.domain.authorization.model.dto.response.LoginReqDto;
import com.trip.domain.authorization.model.dto.response.LogoutReqDto;
import com.trip.domain.member.model.entity.Member;
import com.trip.domain.member.repository.MemberRepository;

@Service
public class AuthorizationServiceImpl implements AuthorizationService {

	private final MemberRepository memberRepository;

	@Autowired
	public AuthorizationServiceImpl(MemberRepository memberRepository) {
		this.memberRepository = memberRepository;
	}

	@Override
	public Member login(LoginReqDto req) {
		return memberRepository.selectByEmailAndPassword(req);
	}

	@Override
	public Member logout(LogoutReqDto req) {
		return memberRepository.selectByIdAndEmail(req);
	}
}
