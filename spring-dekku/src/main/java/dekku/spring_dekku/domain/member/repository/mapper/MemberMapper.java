package dekku.spring_dekku.domain.member.repository.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.trip.domain.authorization.model.dto.response.LoginReqDto;
import com.trip.domain.authorization.model.dto.response.LogoutReqDto;
import com.trip.domain.member.model.dto.request.MemberSignUpReqDto;
import com.trip.domain.member.model.entity.Member;

@Mapper
public interface MemberMapper {

	@Insert("INSERT INTO members (email, password, nickName) VALUES (#{email}, #{password}, #{nickName})")
	Boolean insertMember(MemberSignUpReqDto req);

	@Select("SELECT * FROM members WHERE email=#{email} AND password=#{password}")
	Member selectByEmailAndPassword(LoginReqDto req);

	@Select("SELECT  * FROM  members WHERE id=#{id} AND email=#{email}")
	Member selectByIdAndEmail(LogoutReqDto req);

	@Select("SELECT  * FROM members WHERE email=#{email}")
	Member selectByEmail(String email);

	@Select("SELECT  * FROM members WHERE nickName=#{nickName}")
	Member selectByNickName(String nickName);
}

