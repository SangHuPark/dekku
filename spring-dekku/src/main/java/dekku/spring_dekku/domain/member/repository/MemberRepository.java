package dekku.spring_dekku.domain.member.repository;

//import com.trip.domain.authorization.model.dto.response.LoginReqDto;
//import com.trip.domain.authorization.model.dto.response.LogoutReqDto;
//import com.trip.domain.member.model.dto.request.MemberSignUpReqDto;
//import com.trip.domain.member.model.entity.Member;

import dekku.spring_dekku.domain.member.model.entity.Member;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByEmail(String email);

//    @Modifying
//    @Transactional
//    @Query("UPDATE Member m SET m.token = :token WHERE m.email = :email")
//    void updateTokenByEmail(@Param("email") String email, @Param("token") String token);
}



//public interface MemberRepository {
//
//	Boolean insertMember(MemberSignUpReqDto req);
//	Member selectByEmailAndPassword(LoginReqDto req);
//	Member selectByIdAndEmail(LogoutReqDto req);
//	Member selectByEmail(String email);
//	Member selectByNickName(String nickName);
//}
