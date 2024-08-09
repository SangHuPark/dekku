package dekku.spring_dekku.domain.member.service;

import dekku.spring_dekku.domain.deskterior_post.model.dto.response.FindDeskteriorPostResponseDto;
import dekku.spring_dekku.domain.deskterior_post.model.entity.DeskteriorPost;
import dekku.spring_dekku.domain.deskterior_post.repository.DeskteriorPostRepository;
import dekku.spring_dekku.domain.member.model.dto.response.CreateMyPageResponseDto;
import dekku.spring_dekku.domain.member.model.entity.Like;
import dekku.spring_dekku.domain.member.model.entity.Member;
import dekku.spring_dekku.domain.member.repository.FollowCountRepository;
import dekku.spring_dekku.domain.member.repository.LikeRepository;
import dekku.spring_dekku.domain.member.repository.MemberRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MyPageService {

    private final MemberRepository memberRepository;
    private final FollowCountRepository followCountRepository;
    private final DeskteriorPostRepository deskteriorPostRepository;
    private final LikeRepository likeRepository;

    public CreateMyPageResponseDto getMyPageInfo(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new EntityNotFoundException("Member not found"));

        int followingCount = followCountRepository.countByFromMember(member);
        int followerCount = followCountRepository.countByToMember(member);

        // memberId에 해당하는 DeskteriorPost 가져오기
        List<DeskteriorPost> deskteriorPostEntities = deskteriorPostRepository.findByMemberId(memberId);
        List<FindDeskteriorPostResponseDto> deskteriorPosts = new ArrayList<>();
        for (DeskteriorPost deskteriorPost : deskteriorPostEntities) {
            deskteriorPosts.add(new FindDeskteriorPostResponseDto(deskteriorPost));
        }

        // memberId에 해당하는 Likes 가져오기
        List<Like> likes = likeRepository.findByMember(member);
        List<FindDeskteriorPostResponseDto> likedPosts = new ArrayList<>();
        for (Like like : likes) {
            likedPosts.add(new FindDeskteriorPostResponseDto(like.getDeskteriorPost()));
        }


        return new CreateMyPageResponseDto(
                member.getNickname(),
                member.getImageUrl(),
                member.getIntroduction(),
                followingCount,
                followerCount,
                deskteriorPosts,
                likedPosts
        );
    }
}
