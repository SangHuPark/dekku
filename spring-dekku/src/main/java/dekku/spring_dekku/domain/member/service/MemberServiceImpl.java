package dekku.spring_dekku.domain.member.service;

import dekku.spring_dekku.domain.member.exception.NotExistsUserException;
import dekku.spring_dekku.domain.member.model.dto.MemberDto;
import dekku.spring_dekku.domain.member.model.dto.request.LoginRequestDto;
import dekku.spring_dekku.domain.member.model.dto.request.CreateMemberRequestDto;
import dekku.spring_dekku.domain.member.model.dto.response.CreateMemberResponseDto;
import dekku.spring_dekku.domain.member.model.entity.Member;
import dekku.spring_dekku.domain.member.repository.MemberRepository;
import dekku.spring_dekku.global.status.ErrorCode;
import dekku.spring_dekku.infra.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static dekku.spring_dekku.global.format.StringFormat.DEFAULT_PROFILE;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtUtil jwtUtil;

    // Security session -> Authentication -> UserDetails
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Member member = memberRepository.findByEmail(email);

        if (Objects.isNull(member)) {
            throw new NotExistsUserException(ErrorCode.NOT_EXISTS_USER);
        }

        return new User(
                member.getEmail(),
                member.getPassword(),
                new ArrayList<>());
    }

    public String login(LoginRequestDto loginRequestDto) {
        Member member = memberRepository.findByEmail(loginRequestDto.getEmail());
        if (member == null || !passwordEncoder.matches(loginRequestDto.getPassword(), member.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        String token = jwtUtil.generateAccessToken(loginRequestDto.getEmail());

//        member.setToken(token);
//        memberRepository.save(member);
        memberRepository.updateTokenByEmail(member.getEmail(), token);

        return jwtUtil.generateAccessToken(member.getName());
    }

    @Override
    public CreateMemberResponseDto createMember(CreateMemberRequestDto request) {

        // toEntity() 에 static 제거 -> 요청이 들어와야 필드에 데이터가 생기니까ㅇ
        Member member = request.toEntity(
                passwordEncoder.encode(request.getPassword()),
                DEFAULT_PROFILE);

        memberRepository.save(member);

        CreateMemberResponseDto response = new ModelMapper().map(member, CreateMemberResponseDto.class);

        return response;
    }

    @Override
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    @Override
    public Member saveMember(Member member) {
        return memberRepository.save(member);
    }

    @Override
    public Optional<Member> getMemberById(Long id) {
        return memberRepository.findById(id);
    }

    @Override
    public void deleteMember(Long id) {
        memberRepository.deleteById(id);
    }

    @Override
    public MemberDto getMemberDtoByEmail(String email) {

//        ModelMapper modelMapper

        return null;
    }

//    @Override
//    public Member updateMember(Long id, Member memberDetails) {
//        return memberRepository.findById(id).map(member -> {
//            member.setEmail(memberDetails.getEmail());
//            member.setPassword(memberDetails.getPassword());
//            member.setName(memberDetails.getName());
//            member.setNickname(memberDetails.getNickname());
//            member.setPhone(memberDetails.getPhone());
//            return memberRepository.save(member);
//        }).orElse(null);
//    }

}
