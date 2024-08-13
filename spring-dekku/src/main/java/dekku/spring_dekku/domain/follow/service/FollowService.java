package dekku.spring_dekku.domain.follow.service;

import dekku.spring_dekku.domain.follow.exception.AlreadyFollowUserException;
import dekku.spring_dekku.domain.follow.exception.NotFollowUserException;
import dekku.spring_dekku.domain.follow.model.dto.response.CreateFollowerListResponseDto;
import dekku.spring_dekku.domain.follow.model.dto.response.CreateFollowingListResponseDto;
import dekku.spring_dekku.domain.follow.model.entity.Follow;
import dekku.spring_dekku.domain.follow.repository.FollowRepository;
import dekku.spring_dekku.domain.member.exception.NotExistsUserException;
import dekku.spring_dekku.domain.member.jwt.JwtTokenProvider;
import dekku.spring_dekku.domain.member.model.entity.Member;
import dekku.spring_dekku.domain.member.repository.MemberRepository;
import dekku.spring_dekku.global.status.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class FollowService {

    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final FollowRepository followRepository;

    @Transactional
    public List<CreateFollowerListResponseDto> getFollowerList(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotExistsUserException(ErrorCode.NOT_EXISTS_USER));

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
    public List<CreateFollowingListResponseDto> getFollowingList(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotExistsUserException(ErrorCode.NOT_EXISTS_USER));

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
        Member fromMember = memberRepository.findByUsername(username)
                .orElseThrow(() -> new NotExistsUserException(ErrorCode.NOT_EXISTS_USER));

        Member toMember = memberRepository.findById(toMemberId)
                .orElseThrow(() -> new NotExistsUserException(ErrorCode.NOT_EXISTS_USER));

        if (followRepository.findByFromMemberAndToMember(fromMember, toMember).isPresent()) {
            throw new AlreadyFollowUserException(ErrorCode.CONFLICT_FOLLOW_USER);
        }

        Follow follow = new Follow(fromMember, toMember);
        followRepository.save(follow);
    }

    @Transactional
    public void unfollow(String token, Long toMemberId) {
        String username = jwtTokenProvider.getKeyFromClaims(token, "username");
        Member fromMember = memberRepository.findByUsername(username)
                .orElseThrow(() -> new NotExistsUserException(ErrorCode.NOT_EXISTS_USER));

        Member toMember = memberRepository.findById(toMemberId)
                .orElseThrow(() -> new NotExistsUserException(ErrorCode.NOT_EXISTS_USER));

        Follow follow = followRepository.findByFromMemberAndToMember(fromMember, toMember)
                .orElseThrow(() -> new NotFollowUserException(ErrorCode.FAIL_TO_FOLLOW));

        followRepository.delete(follow);
    }

    @Transactional(readOnly = true)
    public boolean isFollowingUser(String token, Long toMemberId) {
        // 토큰에서 사용자 이름 추출
        String username = jwtTokenProvider.getKeyFromClaims(token, "username");

        // 사용자 정보 가져오기
        Member fromMember = memberRepository.findByUsername(username)
                .orElseThrow(() -> new NotExistsUserException(ErrorCode.NOT_EXISTS_USER));

        // 특정 유저의 정보 확인
        Member toMember = memberRepository.findById(toMemberId)
                .orElseThrow(() -> new NotExistsUserException(ErrorCode.NOT_EXISTS_USER));

        // 팔로우한 유저들의 목록 가져오기
        List<Follow> followings = followRepository.findByFromMember(fromMember);

        // for문을 사용하여 특정 유저의 memberId가 있는지 확인
        for (Follow follow : followings) {
            if (follow.getToMember().getId().equals(toMemberId)) {
                return true;  // 특정 유저를 팔로우하고 있으면 true 반환
            }
        }

        return false;  // 특정 유저를 팔로우하지 않으면 false 반환
    }
}