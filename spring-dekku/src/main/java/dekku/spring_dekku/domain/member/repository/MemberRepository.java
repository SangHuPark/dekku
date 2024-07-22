package dekku.spring_dekku.domain.member.repository;

//import com.trip.domain.authorization.model.dto.response.LoginReqDto;
//import com.trip.domain.authorization.model.dto.response.LogoutReqDto;
//import com.trip.domain.member.model.dto.request.MemberSignUpReqDto;
//import com.trip.domain.member.model.entity.Member;

import dekku.spring_dekku.domain.member.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {}

//public interface MemberRepository {
//
//	Boolean insertMember(MemberSignUpReqDto req);
//	Member selectByEmailAndPassword(LoginReqDto req);
//	Member selectByIdAndEmail(LogoutReqDto req);
//	Member selectByEmail(String email);
//	Member selectByNickName(String nickName);
//}
