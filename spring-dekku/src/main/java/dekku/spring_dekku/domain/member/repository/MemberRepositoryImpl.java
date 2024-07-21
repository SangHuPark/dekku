package dekku.spring_dekku.domain.member.repository;

import org.springframework.stereotype.Repository;

import com.trip.domain.authorization.model.dto.response.LoginReqDto;
import com.trip.domain.authorization.model.dto.response.LogoutReqDto;
import com.trip.domain.member.model.dto.request.MemberSignUpReqDto;
import com.trip.domain.member.model.entity.Member;
import com.trip.domain.member.repository.mapper.MemberMapper;

@Repository
public class MemberRepositoryImpl implements MemberRepository {

	private final MemberMapper memberMapper;

	public MemberRepositoryImpl(MemberMapper memberMapper) {
		this.memberMapper = memberMapper;
	}

	@Override
	public Boolean insertMember(MemberSignUpReqDto req) {
		return memberMapper.insertMember(req);
	}

	@Override
	public Member selectByEmailAndPassword(LoginReqDto req) {
		return memberMapper.selectByEmailAndPassword(req);
	}

	@Override
	public Member selectByIdAndEmail(LogoutReqDto req) {
		return memberMapper.selectByIdAndEmail(req);
	}

	@Override
	public Member selectByEmail(String email) {
		return memberMapper.selectByEmail(email);
	}

	@Override
	public Member selectByNickName(String nickName) {
		return memberMapper.selectByNickName(nickName);
	}

}
