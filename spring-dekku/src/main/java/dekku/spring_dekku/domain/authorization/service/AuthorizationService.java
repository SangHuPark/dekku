package dekku.spring_dekku.domain.authorization.service;

import com.trip.domain.authorization.model.dto.response.LoginReqDto;
import com.trip.domain.authorization.model.dto.response.LogoutReqDto;
import com.trip.domain.member.model.entity.Member;

public interface AuthorizationService {
	Member login(LoginReqDto req);
	Member logout(LogoutReqDto req);
}