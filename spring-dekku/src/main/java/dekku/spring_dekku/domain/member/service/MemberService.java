package dekku.spring_dekku.domain.member.service;

import dekku.spring_dekku.domain.member.model.dto.MemberDto;
import dekku.spring_dekku.domain.member.model.dto.request.LoginRequestDto;
import dekku.spring_dekku.domain.member.model.dto.request.CreateMemberRequestDto;
import dekku.spring_dekku.domain.member.model.dto.response.CreateMemberResponseDto;
import dekku.spring_dekku.domain.member.model.entity.Member;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;

public interface MemberService extends UserDetailsService {
    List<Member> getAllMembers();
    Optional<Member> getMemberById(Long id);
    void deleteMember(Long id);
    String login(LoginRequestDto loginRequestDto);
    CreateMemberResponseDto createMember(CreateMemberRequestDto request);
    MemberDto getMemberDtoByEmail(String email);
//    Member updateMember(Long id, Member member);
}
