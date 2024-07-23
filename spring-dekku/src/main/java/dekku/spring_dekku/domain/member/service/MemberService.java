package dekku.spring_dekku.domain.member.service;

import dekku.spring_dekku.domain.member.model.dto.LoginRequestDto;
import dekku.spring_dekku.domain.member.model.dto.SignUpRequestDto;
import dekku.spring_dekku.domain.member.model.entity.Member;
import java.util.List;
import java.util.Optional;

public interface MemberService {
    List<Member> getAllMembers();
    Member saveMember(Member member);
    Optional<Member> getMemberById(Long id);
    void deleteMember(Long id);
    String login(LoginRequestDto loginRequestDto);
    void signup(SignUpRequestDto signUpRequestDto);
//    Member updateMember(Long id, Member member);
}
