package dekku.spring_dekku.domain.follow.service;

import dekku.spring_dekku.domain.member.jwt.JwtTokenProvider;
import dekku.spring_dekku.domain.follow.model.dto.FollowerDto;
import dekku.spring_dekku.domain.follow.model.dto.FollowingDto;
import dekku.spring_dekku.domain.follow.model.entity.Follow;
import dekku.spring_dekku.domain.member.model.entity.Member;
import dekku.spring_dekku.domain.follow.repository.FollowRepository;
import dekku.spring_dekku.domain.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final FollowRepository followRepository;

    @Transactional
    public List<FollowerDto> getAllFollowers(String token) {
        String username = jwtTokenProvider.getKeyFromClaims(token, "username");
        Member member = memberRepository.findByUsername(username);
        if (member == null) {
            throw new RuntimeException("사용자를 찾을 수 없습니다.");
        }

        return member.getFollowers().stream()
                .map(follow -> {
                    Member follower = follow.getFromMember();
                    return new FollowerDto(
                            follower.getId(),
                            follower.getUsername(),
                            follower.getName(),
                            follower.getEmail(),
                            follower.getImageUrl()
                    );
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public List<FollowingDto> getAllFollowings(String token) {
        String username = jwtTokenProvider.getKeyFromClaims(token, "username");
        Member member = memberRepository.findByUsername(username);
        if (member == null) {
            throw new RuntimeException("사용자를 찾을 수 없습니다.");
        }

        return member.getFollowings().stream()
                .map(follow -> {
                    Member following = follow.getToMember();
                    return new FollowingDto(
                            following.getId(),
                            following.getUsername(),
                            following.getName(),
                            following.getEmail(),
                            following.getImageUrl()
                    );
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public boolean toggleFollow(String token, Long targetId) {
        String username = jwtTokenProvider.getKeyFromClaims(token, "username");
        Member fromMember = memberRepository.findByUsername(username);
        Member toMember = memberRepository.findById(targetId).orElseThrow(() -> new IllegalArgumentException("대상 사용자를 찾을 수 없습니다."));

        if (toMember.equals(fromMember)) {
            throw new IllegalArgumentException("자신을 팔로우할 수 없습니다.");
        }

        boolean isFollowing = followRepository.existsByFromMemberAndToMember(fromMember, toMember);

        if (isFollowing) {
            // 이미 팔로우 중이면 언팔로우
            Follow follow = followRepository.findByFromMemberAndToMember(fromMember, toMember)
                    .orElseThrow(() -> new IllegalStateException("팔로우 관계를 찾을 수 없습니다."));
            followRepository.delete(follow);
            return false; // 언팔로우 수행
        } else {
            // 팔로우 중이 아니면 새로운 팔로우 관계 생성
            Follow follow = Follow.builder()
                    .fromMember(fromMember)
                    .toMember(toMember)
                    .build();
            followRepository.save(follow);
            return true; // 팔로우 수행
        }
    }
}
