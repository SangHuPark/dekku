package dekku.spring_dekku.domain.follow.model.dto.response;

public record CreateFollowingListResponseDto(
        Long id,
        String nickname,
        String imageUrl
) {}