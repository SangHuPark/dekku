package dekku.spring_dekku.domain.like.service;

import dekku.spring_dekku.domain.deskterior_post.exception.NotExistsDeskteriorPostException;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import dekku.spring_dekku.domain.deskterior_post.repository.DeskteriorPostRepository;
import dekku.spring_dekku.domain.like.exception.LikeException;
import dekku.spring_dekku.domain.like.model.dto.LikeDto;
import dekku.spring_dekku.domain.like.model.entity.Like;
import dekku.spring_dekku.domain.like.repository.LikeRepository;
import dekku.spring_dekku.domain.member.exception.MemberNotFoundException;
import dekku.spring_dekku.domain.member.jwt.JwtTokenProvider;
import dekku.spring_dekku.domain.member.model.entity.Member;
import dekku.spring_dekku.domain.member.repository.MemberRepository;
import dekku.spring_dekku.global.exception.AccessTokenException;
import dekku.spring_dekku.global.status.ErrorCode;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final DeskteriorPostRepository deskteriorPostRepository;

    @Transactional
    public LikeDto likePost(Long postId, String token) {
        if (token == null || token.isEmpty()) {
            throw new AccessTokenException("액세스 토큰이 없습니다.");
        }
        String username = jwtTokenProvider.getKeyFromClaims(token, "username");
        Member member = memberRepository.findByUsername(username);
        if(member == null) {
            throw new MemberNotFoundException("사용자를 찾을 수 없습니다.");
        }

        DeskteriorPost post = deskteriorPostRepository.findById(postId)
                .orElseThrow(() -> new NotExistsDeskteriorPostException(ErrorCode.NOT_EXISTS_DESKTERIOR_POST));

        if (likeRepository.existsByMemberAndDeskteriorPost(member, post)) {
            throw new LikeException("이미 좋아요를 눌렀습니다.");
        }

        Like like = new Like(member, post);
        likeRepository.save(like);
        member.getLikes().add(like);

        return LikeDto.builder()
                .id(like.getId())
                .postId(like.getDeskteriorPost().getId())
                .memberId(like.getMember().getId())
                .build();
    }

    @Transactional
    public LikeDto unlikePost(Long postId, String token) {
        if (token == null || token.isEmpty()) {
            throw new AccessTokenException("액세스 토큰이 없습니다.");
        }
        String username = jwtTokenProvider.getKeyFromClaims(token, "username");
        Member member = memberRepository.findByUsername(username);
        if(member == null) {
            throw new MemberNotFoundException("사용자를 찾을 수 없습니다.");
        }

        DeskteriorPost post = deskteriorPostRepository.findById(postId)
                .orElseThrow(() -> new NotExistsDeskteriorPostException(ErrorCode.NOT_EXISTS_DESKTERIOR_POST));

        List<Like> likeList = likeRepository.findByMember(member);
        for(Like like : likeList) {
            if(like.getDeskteriorPost().equals(post)) {
                likeRepository.delete(like);
                member.getLikes().remove(like);
                return LikeDto.builder()
                        .id(like.getId())
                        .postId(like.getDeskteriorPost().getId())
                        .memberId(like.getMember().getId())
                        .build();
            }
        }
        throw new LikeException("이미 좋아요를 취소했니다.");
    }
}
