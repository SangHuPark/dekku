package dekku.spring_dekku.domain.member.service.oauth2;

import dekku.spring_dekku.domain.member.model.dto.MemberDto;
import dekku.spring_dekku.domain.member.model.dto.MemberUpdateDto;
import dekku.spring_dekku.domain.member.model.entity.Member;
import dekku.spring_dekku.domain.member.jwt.JwtTokenProvider;
import dekku.spring_dekku.domain.member.repository.MemberRepository;
import dekku.spring_dekku.domain.member.service.RedisService;
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
    private final RedisService redisService;
    private final OAuthUnlinkService oAuthUnlinkService;

    @Transactional
    public void updateUser(MemberUpdateDto request, String token) throws Exception {
        if(!jwtTokenProvider.validateToken(token)){
            throw new Exception("JWT Token 만료");
        }
        String socialId = jwtTokenProvider.getKeyFromClaims(token, "username");
        memberRepository.update(socialId, request.nickname(), request.ageRange(), request.gender(), request.imageUrl());
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
        ModelMapper modelMapper = new ModelMapper();
        MemberDto memberDto = modelMapper.map(member, MemberDto.class);

        return memberDto;
    }

    @Transactional
    public void delete(String requestAccessToken) {
        if (requestAccessToken == null || requestAccessToken.isEmpty()) {
            throw new RuntimeException("액세스 토큰이 없습니다.");
        }
        String username = jwtTokenProvider.getKeyFromClaims(requestAccessToken, "username");
        Member member = memberRepository.findByUsername(username);
        if (member == null) {
            throw new RuntimeException("사용자를 찾을 수 없습니다.");
        }

        // Redis에서 Refresh Token 삭제
        String refreshTokenInRedis = redisService.getValues("RT:SERVER:" + username);
        System.out.println("Refresh token 삭제?");
        if (refreshTokenInRedis != null) {
            redisService.deleteValues("RT:SERVER:" + username);
        }

        // Redis에 회원탈퇴 처리한 Access Token 저장
        long expiration = jwtTokenProvider.getExpirationDateFromToken(requestAccessToken).getTime() - System.currentTimeMillis();
        if (expiration > 0) {
            redisService.setValuesWithTimeout(requestAccessToken, "delete", expiration);
        }

        // 소셜 로그인 연동 해제
        String provider = username.split(" ")[0];
        String socialAccessToken = redisService.getValues("AT(oauth2):" + username);
        if (socialAccessToken != null) {
            if (provider.equals("kakao")) {
                oAuthUnlinkService.kakaoUnlink(socialAccessToken);
            } else if (provider.equals("naver")) {
                oAuthUnlinkService.naverUnlink(socialAccessToken);
            }
            redisService.deleteValues("AT(oauth2):" + username);
        }
        memberRepository.delete(member);
        jwtTokenProvider.invalidateToken(requestAccessToken);
    }
}
