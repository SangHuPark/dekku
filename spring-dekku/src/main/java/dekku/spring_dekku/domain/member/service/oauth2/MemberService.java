package dekku.spring_dekku.domain.member.service.oauth2;

import dekku.spring_dekku.domain.member.model.dto.MemberDto;
import dekku.spring_dekku.domain.member.model.dto.MemberUpdateDto;
import dekku.spring_dekku.domain.member.model.entity.Member;
import dekku.spring_dekku.domain.member.jwt.JwtTokenProvider;
import dekku.spring_dekku.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final ModelMapper modelMapper;

    @Transactional
    public void updateUser(MemberUpdateDto request, String token) throws Exception {
        if(!jwtTokenProvider.validateToken(token)){
            throw new Exception("JWT Token 만료");
        }
        String socialId = jwtTokenProvider.getKeyFromClaims(token, "username");
        System.out.println("test social id(username): "+socialId);
        System.out.println(request.getNickname());
        System.out.println(request.getAgeRange());
        memberRepository.update(socialId, request.getNickname(), request.getAgeRange(), request.getGender());
    }

    @Transactional
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    @Transactional
    public Optional<Member> getMemberById(Long id) {
        return memberRepository.findById(id);
    }

    @Transactional
    public void deleteMember(Long id) {
        memberRepository.deleteById(id);
    }

    @Transactional
    public MemberDto getMemberDtoByEmail(String email) {

        Member member = memberRepository.findByEmail(email);

        MemberDto memberDto = modelMapper.map(member, MemberDto.class);

        return memberDto;
    }
}
