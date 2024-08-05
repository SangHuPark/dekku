package dekku.spring_dekku.domain.member.model.dto.response;

import dekku.spring_dekku.domain.member.model.entity.Follow;

import java.util.List;

public record CreateMemberResponseDto (
    String username,
    String email,
    String name,
    String nickname,
    String gender,
    List<Follow> followings,
    List<Follow> followers
) {}