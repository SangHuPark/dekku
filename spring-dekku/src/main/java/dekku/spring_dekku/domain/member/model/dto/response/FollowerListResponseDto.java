package dekku.spring_dekku.domain.member.model.dto.response;

import dekku.spring_dekku.domain.member.model.entity.Member;

import java.util.List;

public record FollowerListResponseDto(
        List<Member> followers
) {}
