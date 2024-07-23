package dekku.spring_dekku.domain.member.service;

import dekku.spring_dekku.domain.member.model.dto.LoginRequestDto;
import dekku.spring_dekku.domain.member.model.dto.SignUpRequestDto;
import dekku.spring_dekku.domain.member.model.entity.Member;
import dekku.spring_dekku.domain.member.repository.MemberRepository;
import dekku.spring_dekku.global.security.JwtTokenUtil;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {


//    @Autowired
//    private MemberRepository memberRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Autowired
//    private JwtTokenUtil jwtTokenUtil;

    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtTokenUtil jwtTokenUtil;

//    @Autowired
//    public MemberServiceImpl(MemberRepository memberRepository, PasswordEncoder passwordEncoder, JwtTokenUtil jwtTokenUtil) {
//        this.memberRepository = memberRepository;
//        this.passwordEncoder = passwordEncoder;
//        this.jwtTokenUtil = jwtTokenUtil;
//    }

    public String login(LoginRequestDto loginRequestDto) {
        Member member = memberRepository.findByEmail(loginRequestDto.getEmail());
        if (member == null || !passwordEncoder.matches(loginRequestDto.getPassword(), member.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        String token = jwtTokenUtil.generateToken(loginRequestDto.getEmail());

//        member.setToken(token);
//        memberRepository.save(member);
        memberRepository.updateTokenByEmail(member.getEmail(), token);

        return jwtTokenUtil.generateToken(member.getName());
    }

    @Override
    public void signup(SignUpRequestDto signUpRequestDto) {
        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(signUpRequestDto.getPassword());

        Member member = Member.builder()
                .email(signUpRequestDto.getEmail())
                .password(encodedPassword)
                .name(signUpRequestDto.getName())
                .nickname(signUpRequestDto.getNickname())
                .phone(signUpRequestDto.getPhone())
                .created_at(signUpRequestDto.getCreated_at())
                .build();

        memberRepository.save(member);
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
