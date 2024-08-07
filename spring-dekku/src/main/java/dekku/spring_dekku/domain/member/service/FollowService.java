// FollowService.java
package dekku.spring_dekku.domain.member.service;

import dekku.spring_dekku.domain.member.model.dto.response.CreateFollowerListResponseDto;
import dekku.spring_dekku.domain.member.model.dto.response.CreateFollowingListResponseDto;
import dekku.spring_dekku.domain.member.model.entity.Follow;
import dekku.spring_dekku.domain.member.model.entity.Member;
import dekku.spring_dekku.domain.member.repository.FollowRepository;
import dekku.spring_dekku.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FollowService {

    private final MemberRepository memberRepository;
    private final FollowRepository followRepository;

    // 팔로잉 목록
    public List<CreateFollowingListResponseDto> getFollowingList(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("회원이 존재하지 않습니다"));

        List<CreateFollowingListResponseDto> followingList = new ArrayList<>();
        for (Follow follow : member.getFollowings()) {
            Member toMember = follow.getToMember();
            CreateFollowingListResponseDto dto = new CreateFollowingListResponseDto(
                    toMember.getNickname(),
                    toMember.getImage_url()
            );
            followingList.add(dto);
        }

        return followingList;
    }

    // 팔로워 목록
    public List<CreateFollowerListResponseDto> getFollowerList(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("회원이 존재하지 않습니다"));

        List<CreateFollowerListResponseDto> followingList = new ArrayList<>();
        for (Follow follow : member.getFollowers()) {
            Member fromMember = follow.getFromMember();
            CreateFollowerListResponseDto dto = new CreateFollowerListResponseDto(
                    fromMember.getNickname(),
                    fromMember.getImage_url()
            );
            followingList.add(dto);
        }

        return followingList;
    }

    // 팔로우
    @Transactional
    public void follow(Long fromMemberId, Long toMemberId) {
        Member fromMember = memberRepository.findById(fromMemberId)
                .orElseThrow(() -> new RuntimeException("팔로우할 회원이 존재하지 않습니다"));
        Member toMember = memberRepository.findById(toMemberId)
                .orElseThrow(() -> new RuntimeException("팔로우 받을 회원이 존재하지 않습니다"));

        for (Follow follow : fromMember.getFollowings()) {
            if (follow.getToMember().equals(toMember)) {
                throw new RuntimeException("이미 팔로우한 회원입니다");
            }
        }

        Follow follow = new Follow(fromMember, toMember);
        followRepository.save(follow);
    }

    // 언팔로우
    @Transactional
    public void unfollow(Long fromMemberId, Long toMemberId) {
        Member fromMember = memberRepository.findById(fromMemberId)
                .orElseThrow(() -> new RuntimeException("언팔로우할 회원이 존재하지 않습니다"));
        Member toMember = memberRepository.findById(toMemberId)
                .orElseThrow(() -> new RuntimeException("언팔로우 당할 회원이 존재하지 않습니다"));

        Follow followToRemove = null;
        for (Follow follow : fromMember.getFollowings()) {
            if (follow.getToMember().equals(toMember)) {
                followToRemove = follow;
                break;
            }
        }

        if (followToRemove == null) {
            throw new RuntimeException("팔로우 관계가 존재하지 않습니다");
        }

        followRepository.delete(followToRemove);
    }
}
