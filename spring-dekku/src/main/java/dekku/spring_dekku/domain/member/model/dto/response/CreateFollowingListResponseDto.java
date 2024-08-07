package dekku.spring_dekku.domain.member.model.dto.response;

public record CreateFollowingListResponseDto(
        String nickname,
        String imageUrl
) {}