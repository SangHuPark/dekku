package dekku.spring_dekku.domain.follow.model.dto.response;

public record CreateFollowerListResponseDto(
        Long id,
        String nickname,
        String imageUrl
) {}
