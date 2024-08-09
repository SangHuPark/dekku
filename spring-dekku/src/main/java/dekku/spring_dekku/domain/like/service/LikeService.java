package dekku.spring_dekku.domain.like.service;

import dekku.spring_dekku.domain.like.repository.LikeRepository;
import dekku.spring_dekku.domain.member.exception.MemberNotFoundException;
import dekku.spring_dekku.domain.member.jwt.JwtTokenProvider;
import dekku.spring_dekku.domain.member.model.entity.Member;
import dekku.spring_dekku.domain.member.repository.MemberRepository;
import dekku.spring_dekku.global.exception.AccessTokenException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public void likePost(Long postId, String token) {
        if (token == null || token.isEmpty()) {
            throw new AccessTokenException("액세스 토큰이 없습니다.");
        }
        String username = jwtTokenProvider.getKeyFromClaims(token, "username");
        Member member = memberRepository.findByUsername(username);
        if (member == null) {
            throw new MemberNotFoundException("사용자를 찾을 수 없습니다.");
        }

    }

    @Transactional
    public void unlikePost() {

    }
}
