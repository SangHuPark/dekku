package dekku.spring_dekku.domain.member.service;

import com.trip.domain.member.model.dto.request.MemberSignUpReqDto;
import com.trip.domain.member.model.entity.Member;

public interface MemberService {

	boolean signUp(MemberSignUpReqDto req);
	Member checkDuplicationEmail(String email);
	Member checkDuplicationNickName(String nickName);

}
