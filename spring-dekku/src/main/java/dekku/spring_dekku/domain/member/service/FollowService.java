package dekku.spring_dekku.domain.member.service;

import dekku.spring_dekku.domain.member.model.dto.response.FollowerListResponseDto;
import dekku.spring_dekku.domain.member.model.dto.response.FollowingListResponseDto;
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

    public FollowingListResponseDto getFollowingList(Long toMemberId) {
        Member member = memberRepository.findById(toMemberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        List<Follow> follows = followRepository.findByFromMember(member);
        List<Member> followingList = new ArrayList<>();
        for (Follow follow : follows) {
            followingList.add(follow.getToMember());
        }

        return new FollowingListResponseDto(followingList);
    }

    public FollowerListResponseDto getFollowerList(Long fromMemberId) {
        Member member = memberRepository.findById(fromMemberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        List<Follow> follows = followRepository.findByToMember(member);
        List<Member> followerList = new ArrayList<>();
        for (Follow follow : follows) {
            followerList.add(follow.getFromMember());
        }

        return new FollowerListResponseDto(followerList);
    }

    @Transactional
    public void follow(Long fromMemberId, Long toMemberId) {
        Member fromMember = memberRepository.findById(fromMemberId)
                .orElseThrow(() -> new RuntimeException("From Member not found"));
        Member toMember = memberRepository.findById(toMemberId)
                .orElseThrow(() -> new RuntimeException("To Member not found"));

        boolean alreadyFollowing = followRepository.findByFromMemberAndToMember(fromMember, toMember).isPresent();
        if (alreadyFollowing) {
            throw new RuntimeException("Already following this member");
        }

        Follow follow = new Follow(fromMember, toMember);
        followRepository.save(follow);
    }

    @Transactional
    public void unfollow(Long fromMemberId, Long toMemberId) {
        Member fromMember = memberRepository.findById(fromMemberId)
                .orElseThrow(() -> new RuntimeException("From Member not found"));
        Member toMember = memberRepository.findById(toMemberId)
                .orElseThrow(() -> new RuntimeException("To Member not found"));

        Follow follow = followRepository.findByFromMemberAndToMember(fromMember, toMember)
                .orElseThrow(() -> new RuntimeException("Follow relationship not found"));

        followRepository.delete(follow);
    }
}
