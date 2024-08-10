package dekku.spring_dekku.domain.follow.service;

import dekku.spring_dekku.domain.follow.exception.FollowException;
import dekku.spring_dekku.domain.follow.model.dto.response.CreateFollowerListResponseDto;
import dekku.spring_dekku.domain.follow.model.dto.response.CreateFollowingListResponseDto;
import dekku.spring_dekku.domain.follow.model.entity.Follow;
import dekku.spring_dekku.domain.follow.repository.FollowRepository;
import dekku.spring_dekku.domain.member.exception.MemberNotFoundException;
import dekku.spring_dekku.domain.member.jwt.JwtTokenProvider;
import dekku.spring_dekku.domain.member.model.entity.Member;
import dekku.spring_dekku.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class FollowService {

    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final FollowRepository followRepository;

    @Transactional
    public List<CreateFollowerListResponseDto> getFollowerList(String token) {
        String username = jwtTokenProvider.getKeyFromClaims(token, "username");
        Member member = memberRepository.findByUsername(username);
        if (member == null) {
            throw new MemberNotFoundException("사용자를 찾을 수 없습니다.");
        }
        List<Follow> followerEntities = followRepository.findByToMember(member);
        List<CreateFollowerListResponseDto> followers = new ArrayList<>();

        for (Follow follower : followerEntities) {
            Member fromMember = follower.getFromMember();
            CreateFollowerListResponseDto dto = new CreateFollowerListResponseDto(
                    fromMember.getNickname(),
                    fromMember.getImageUrl()
            );
            followers.add(dto);
        }
        return followers;
    }

    @Transactional
    public List<CreateFollowingListResponseDto> getFollowingList(String token) {
        String username = jwtTokenProvider.getKeyFromClaims(token, "username");
        Member member = memberRepository.findByUsername(username);
        if (member == null) {
            throw new MemberNotFoundException("사용자를 찾을 수 없습니다.");
        }
        List<Follow> followingEntities = followRepository.findByFromMember(member);
        List<CreateFollowingListResponseDto> followings = new ArrayList<>();

        for (Follow following : followingEntities) {
            Member toMember = following.getToMember();
            CreateFollowingListResponseDto dto = new CreateFollowingListResponseDto(
                    toMember.getNickname(),
                    toMember.getImageUrl()
            );
            followings.add(dto);
        }
        return followings;
    }

    @Transactional
    public void follow(String token, Long toMemberId) {
        String username = jwtTokenProvider.getKeyFromClaims(token, "username");
        Member fromMember = memberRepository.findByUsername(username);
        if (fromMember == null) {
            throw new MemberNotFoundException("사용자를 찾을 수 없습니다.");
        }
        Member toMember = memberRepository.findById(toMemberId)
                .orElseThrow(() -> new MemberNotFoundException("팔로우할 사용자를 찾을 수 없습니다."));
        if(followRepository.findByFromMemberAndToMember(fromMember, toMember).isPresent()) {
            throw new FollowException("이미 팔로우한 사용자입니다.");
        }
        Follow follow = new Follow(fromMember, toMember);
        followRepository.save(follow);
    }

    @Transactional
    public void unfollow(String token, Long toMemberId) {
        String username = jwtTokenProvider.getKeyFromClaims(token, "username");
        Member fromMember = memberRepository.findByUsername(username);
        if (fromMember == null) {
            throw new MemberNotFoundException("사용자를 찾을 수 없습니다.");
        }
        Member toMember = memberRepository.findById(toMemberId)
                .orElseThrow(() -> new MemberNotFoundException("언팔로우할 사용자를 찾을 수 없습니다."));
        Follow follow = followRepository.findByFromMemberAndToMember(fromMember, toMember)
                .orElseThrow(() -> new FollowException("팔로우하지 않은 사용자입니다."));
        followRepository.delete(follow);
    }
}